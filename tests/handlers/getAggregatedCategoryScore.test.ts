import { ServerErrorResponse } from '@grpc/grpc-js';
import { ServerWritableStreamImpl } from '@grpc/grpc-js/build/src/server-call';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import {
	AggregatedCategoryScore,
	TimePeriod
} from '../../proto/server/klaus_pb';
import { getAggregatedCategoryScore } from '../../src/handlers/getAggregatedCategoryScore';

describe('getAggregatedCategoryScore', () => {
	it('period should be in days if provided time period is < 30 days', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(1563310800))
			.setEnddate(new Timestamp().setSeconds(1563325200));

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(response[0].periodscoreList[0].period).toBe(
				'Tue Jul 16 2019'
			);
		});
	});

	it('period should be in weeks if provided time period is > 30 days', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(1563310800))
			.setEnddate(new Timestamp().setSeconds(1566075600));

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(response[0].periodscoreList[0].period).toBe('Week 29');
		});
	});

	it('calculates aggregated category score correctly', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(1563310800))
			.setEnddate(new Timestamp().setSeconds(1563332400));

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(response[0].score).toBe(43);
			expect(response[0].ratingcount).toBe(7);
			expect(response[0].category).toBe('Spelling');

			expect(response[0].periodscoreList[0].period).toBe(
				'Wed Jul 17 2019'
			);
			expect(response[0].periodscoreList[0].score).toBe(36);

			expect(response[0].periodscoreList[1].period).toBe(
				'Tue Jul 16 2019'
			);
			expect(response[0].periodscoreList[1].score).toBe(60);
		});
	});

	it('throws if start date is empty', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod().setEnddate(
			new Timestamp().setSeconds(1563332400)
		);

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(error.message).toBe('start date is empty');
		});
	});

	it('throws if end date is empty', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod().setStartdate(
			new Timestamp().setSeconds(1563332400)
		);

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(error.message).toBe('end date is empty');
		});
	});

	it('throws if start date after end date', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];

		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(2))
			.setEnddate(new Timestamp().setSeconds(1));

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(error.message).toBe('start date cant be after end date');
		});
	});

	it('emits error if there are no ratings in provided time period', async () => {
		let error: ServerErrorResponse;
		const response: Array<any> = [];
		let event: any;
		let metadata: any;

		const timePeriod = new TimePeriod()
			.setStartdate(new Timestamp().setSeconds(1))
			.setEnddate(new Timestamp().setSeconds(3));

		const call = {
			request: timePeriod,
			write: (chunk: AggregatedCategoryScore) => {
				response.push(chunk.toObject());
			},
			end: () => {},
			destroy: (err: ServerErrorResponse) => {
				error = err;
			},
			emit: (e, meta) => {
				(event = e), (metadata = meta);
			}
		} as ServerWritableStreamImpl<TimePeriod, AggregatedCategoryScore>;

		await getAggregatedCategoryScore(call).then(() => {
			expect(event).toBe('error');
			expect(metadata.code).toBe(5);
			expect(metadata.details).toBe('no ratings in provided period');
		});
	});
});
