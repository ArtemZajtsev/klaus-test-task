// payload example
// {
// 	"startDate": {
// 		"seconds": 1563310800,
// 		"nanos": 0
// 	},
// 	"endDate": {
// 		"seconds": 1563325200,
// 		"nanos": 0
// 	}
// }
import type {
	ServerErrorResponse,
	ServerUnaryCall,
	sendUnaryData
} from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import type { TimePeriod } from '../../proto/server/klaus_pb';
import { OverallScore } from '../../proto/server/klaus_pb';
import { Db } from '../db';
import {
	aggregateRatingsForScoring,
	getStartEndDate,
	getWeightedScore
} from '../utils';

const db = Db.getDbConnectionInstance();

// wasnt stated directly in a task but i assumed it needs weighted overall score
export async function getOverallScore(
	call: ServerUnaryCall<TimePeriod, OverallScore>,
	callback: sendUnaryData<OverallScore>
) {
	try {
		const [startDate, endDate] = getStartEndDate(call.request);

		const ratingsOverPeriod = await db.getRatingsWithCategoriesByPeriod(
			startDate,
			endDate
		);
		if (!ratingsOverPeriod.length) {
			callback({
				code: grpc.status.NOT_FOUND,
				details: 'no ratings in provided period'
			});
		}

		const score = getWeightedScore(
			aggregateRatingsForScoring(ratingsOverPeriod)
		);

		const overallScore = new OverallScore();
		overallScore.setOverallscore(score);

		callback(null, overallScore);
	} catch (err) {
		callback(err as ServerErrorResponse, null);
	}
}
