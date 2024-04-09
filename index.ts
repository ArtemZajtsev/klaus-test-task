import * as grpc from '@grpc/grpc-js';
import { ScoringService } from './proto/server/klaus_grpc_pb';
import { getAggregatedCategoryScore } from './src/handlers/getAggregatedCategoryScore';
import { getAggregatedTicketScore } from './src/handlers/getAggregatedTicketScore';
import { getOverallScore } from './src/handlers/getOverallScore';
import { getScoreChangeAgainstPreviousPeriod } from './src/handlers/getScoreChangeAgainstPreviousPeriod';
import { getTicketScore } from './src/handlers/getTicketScore';

const server = new grpc.Server();
server.addService(ScoringService, {
	getAggregatedCategoryScore,
	getTicketScore,
	getAggregatedTicketScore,
	getOverallScore,
	getScoreChangeAgainstPreviousPeriod
});

const uri = '127.0.0.1:42069';

server.bindAsync(uri, grpc.ServerCredentials.createInsecure(), (err) => {
	if (err) console.log(err);
});

console.log(`Listening on ${uri}`);
