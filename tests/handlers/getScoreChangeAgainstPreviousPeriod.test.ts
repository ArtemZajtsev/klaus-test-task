import {
	ServerErrorResponse,
	ServerUnaryCallImpl,
	sendUnaryData
} from '@grpc/grpc-js/build/src/server-call';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { ScoreChange, TimePeriod } from '../../proto/server/klaus_pb';
import { getScoreChangeAgainstPreviousPeriod } from '../../src/handlers/getScoreChangeAgainstPreviousPeriod';

describe('getScoreChangeAgainstPreviousPeriod', () => {
	it('calculates score change correctly', async () => {
		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(1563310800))
			.setEnddate(new Timestamp().setSeconds(1563325200));

		const call = {
			request: timePeriod
		} as ServerUnaryCallImpl<TimePeriod, ScoreChange>;

		let error: ServerErrorResponse;
		let response: ScoreChange;

		await getScoreChangeAgainstPreviousPeriod(call, ((
			err: ServerErrorResponse,
			res: ScoreChange
		) => {
			error = err;
			response = res;
		}) as sendUnaryData<ScoreChange>).then(() => {
			expect(error).toBe(null);
			expect(response.toObject().scorechangeabsolute).toBe(-15);
			expect(response.toObject().scorechangepercentagechange).toBe(-21);
		});
	});

	it('throws if start date is empty', async () => {
		const timePeriod = new TimePeriod().setEnddate(
			new Timestamp().setSeconds(1563325200)
		);

		const call = {
			request: timePeriod
		} as ServerUnaryCallImpl<TimePeriod, ScoreChange>;

		let error: ServerErrorResponse;
		let response: ScoreChange;

		await getScoreChangeAgainstPreviousPeriod(call, ((
			err: ServerErrorResponse,
			res: ScoreChange
		) => {
			error = err;
			response = res;
		}) as sendUnaryData<ScoreChange>).then(() => {
			expect(error.message).toBe('start date is empty');
			expect(response).toBe(null);
		});
	});

	it('throws if end date is empty', async () => {
		const timePeriod = new TimePeriod().setStartdate(
			new Timestamp().setSeconds(1563325200)
		);

		const call = {
			request: timePeriod
		} as ServerUnaryCallImpl<TimePeriod, ScoreChange>;

		let error: ServerErrorResponse;
		let response: ScoreChange;

		await getScoreChangeAgainstPreviousPeriod(call, ((
			err: ServerErrorResponse,
			res: ScoreChange
		) => {
			error = err;
			response = res;
		}) as sendUnaryData<ScoreChange>).then(() => {
			expect(error.message).toBe('end date is empty');
			expect(response).toBe(null);
		});
	});

	it('throws if start date after end date', async () => {
		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(2))
			.setEnddate(new Timestamp().setSeconds(1));

		const call = {
			request: timePeriod
		} as ServerUnaryCallImpl<TimePeriod, ScoreChange>;

		let error: ServerErrorResponse;
		let response: ScoreChange;

		await getScoreChangeAgainstPreviousPeriod(call, ((
			err: ServerErrorResponse,
			res: ScoreChange
		) => {
			error = err;
			response = res;
		}) as sendUnaryData<ScoreChange>).then(() => {
			expect(error.message).toBe('start date cant be after end date');
			expect(response).toBe(null);
		});
	});
});
