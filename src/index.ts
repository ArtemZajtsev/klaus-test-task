import * as grpc from '@grpc/grpc-js';
import { ScoringService } from '../proto/server/klaus_grpc_pb';
import { getAggregatedCategoryScore } from './handlers/getAggregatedCategoryScore';
import { getAggregatedTicketScore } from './handlers/getAggregatedTicketScore';
import { getOverallScore } from './handlers/getOverallScore';
import { getScoreChangeAgainstPreviousPeriod } from './handlers/getScoreChangeAgainstPreviousPeriod';
import { getTicketScore } from './handlers/getTicketScore';

const server = new grpc.Server();
/* eslint-disable @typescript-eslint/no-misused-promises */
server.addService(ScoringService, {
	getAggregatedCategoryScore,
	getTicketScore,
	getAggregatedTicketScore,
	getOverallScore,
	getScoreChangeAgainstPreviousPeriod
});

const uri = '0.0.0.0:42069';

server.bindAsync(uri, grpc.ServerCredentials.createInsecure(), (err) => {
	if (err) console.log(err);
});

console.log(`Listening on ${uri}`);
