// example payload
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
import { ScoreChange } from '../../proto/server/klaus_pb';
import { Db } from '../db';
import {
	aggregateRatingsForScoring,
	getPreviousPeriod,
	getStartEndDate,
	getWeightedScore
} from '../utils';

const db = Db.getDbConnectionInstance();

export async function getScoreChangeAgainstPreviousPeriod(
	call: ServerUnaryCall<TimePeriod, ScoreChange>,
	callback: sendUnaryData<ScoreChange>
) {
	try {
		const [startDate, endDate] = getStartEndDate(call.request);
		const [previousStartDate, previousEndDate] = getPreviousPeriod(startDate, endDate);

		const ratingsOverCurrentPeriod =
			await db.getRatingsWithCategoriesByPeriod(startDate, endDate);
		if (!ratingsOverCurrentPeriod.length) {
			callback({
				code: grpc.status.NOT_FOUND,
				details: 'no ratings in current period'
			});
		}

		const ratingsOverPreviousPeriod =
			await db.getRatingsWithCategoriesByPeriod(
				previousStartDate,
				previousEndDate
			);
		if (!ratingsOverPreviousPeriod.length) {
			callback({
				code: grpc.status.NOT_FOUND,
				details: 'no ratings in previous period'
			});
		}

		const currentScore = getWeightedScore(
			aggregateRatingsForScoring(ratingsOverCurrentPeriod)
		);
		const previousScore = getWeightedScore(
			aggregateRatingsForScoring(ratingsOverPreviousPeriod)
		);

		const scoreChangeAbsolute = currentScore - previousScore;
		const scoreChangePercentage = Math.round(
			((currentScore - previousScore) / previousScore) * 100
		);

		const scoreChange = new ScoreChange();
		scoreChange.setScorechangeabsolute(scoreChangeAbsolute);
		scoreChange.setScorechangepercentagechange(scoreChangePercentage);

		callback(null, scoreChange);
	} catch (err) {
		callback(err as ServerErrorResponse, null);
	}
}
