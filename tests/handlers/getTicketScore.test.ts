import {
	ServerErrorResponse,
	ServerUnaryCallImpl,
	sendUnaryData
} from '@grpc/grpc-js/build/src/server-call';
import { TicketId, TicketScore } from '../../proto/server/klaus_pb';
import { getTicketScore } from '../../src/handlers/getTicketScore';

describe('getTicketScore', () => {
	it('calculates ticket score correctly', async () => {
		const ticketId = new TicketId().setTicketid(129177);

		const call = {
			request: ticketId
		} as ServerUnaryCallImpl<TicketId, TicketScore>;

		let error: ServerErrorResponse;
		let response: TicketScore;

		await getTicketScore(call, ((
			err: ServerErrorResponse,
			res: TicketScore
		) => {
			error = err;
			response = res;
		}) as sendUnaryData<TicketScore>).then(() => {
			expect(error).toBe(null);

			expect(response.toObject().tickettotalscore).toBe(51);
		});
	});
});
