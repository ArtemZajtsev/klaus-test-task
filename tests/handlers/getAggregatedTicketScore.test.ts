import { ServerErrorResponse } from "@grpc/grpc-js";
import { ServerWritableStreamImpl } from "@grpc/grpc-js/build/src/server-call";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { AggregatedTicketScore, TimePeriod } from "../../proto/server/klaus_pb";
import { getAggregatedTicketScore } from "../../src/handlers/getAggregatedTicketScore";

describe('getAggregatedTicketScore',() => {
    it('calculates aggregated ticket score correctly', async () => {
        let error: ServerErrorResponse;
        const response: Array<any> = [];

        const timePeriod = new TimePeriod()
            .setStartdate(new Timestamp().setSeconds(1563310800))
            .setEnddate(new Timestamp().setSeconds(1563318000));
        
        const call = {
            request: timePeriod,
            write: (chunk: AggregatedTicketScore) => {
                response.push(chunk.toObject());
            },
            end: () => {},
            destroy: (err: ServerErrorResponse) => {
                error = err;
            },
        } as ServerWritableStreamImpl<TimePeriod, AggregatedTicketScore>;

        await getAggregatedTicketScore(call).then(() => {
            expect(response[0].ticketid).toBe(161754);

            expect(response[0].ticketcategoryscoreList[0].id).toBe(1);
            expect(response[0].ticketcategoryscoreList[0].name).toBe('Spelling');
            expect(response[0].ticketcategoryscoreList[0].score).toBe(40);

            expect(response[0].ticketcategoryscoreList[1].id).toBe(2);
            expect(response[0].ticketcategoryscoreList[1].name).toBe('Grammar');
            expect(response[0].ticketcategoryscoreList[1].score).toBe(20);

            expect(response[0].ticketcategoryscoreList[2].id).toBe(3);
            expect(response[0].ticketcategoryscoreList[2].name).toBe('GDPR');
            expect(response[0].ticketcategoryscoreList[2].score).toBe(60);

            expect(response[0].ticketcategoryscoreList[3].id).toBe(4);
            expect(response[0].ticketcategoryscoreList[3].name).toBe('Randomness');
            expect(response[0].ticketcategoryscoreList[3].score).toBe(60);
        });
    });

    it('throws if start date is empty', async () => {
        let error: ServerErrorResponse;
        const response: Array<any> = [];

        const timePeriod = new TimePeriod()
            .setEnddate(new Timestamp().setSeconds(1563318000));
        
        const call = {
            request: timePeriod,
            write: (chunk: AggregatedTicketScore) => {
                response.push(chunk.toObject());
            },
            end: () => {},
            destroy: (err: ServerErrorResponse) => {
                error = err;
            },
        } as ServerWritableStreamImpl<TimePeriod, AggregatedTicketScore>;

        await getAggregatedTicketScore(call).then(() => {
            expect(error.message).toBe('start date is empty');
        });
    });

    it('throws if end date is empty', async () => {
        let error: ServerErrorResponse;
        const response: Array<any> = [];

        const timePeriod = new TimePeriod()
            .setStartdate(new Timestamp().setSeconds(1563318000));
        
        const call = {
            request: timePeriod,
            write: (chunk: AggregatedTicketScore) => {
                response.push(chunk.toObject());
            },
            end: () => {},
            destroy: (err: ServerErrorResponse) => {
                error = err;
            },
        } as ServerWritableStreamImpl<TimePeriod, AggregatedTicketScore>;

        await getAggregatedTicketScore(call).then(() => {
            expect(error.message).toBe('end date is empty');
        });
    });

    it('throws if start date after end date', async () => {
        let error: ServerErrorResponse;
        const response: Array<any> = [];

        const timePeriod = new TimePeriod()
            .setStartdate(new Timestamp().setSeconds(2))
            .setEnddate(new Timestamp().setSeconds(1))

        const call = {
            request: timePeriod,
            write: (chunk: AggregatedTicketScore) => {
                response.push(chunk.toObject());
            },
            end: () => {},
            destroy: (err: ServerErrorResponse) => {
                error = err;
            },
        } as ServerWritableStreamImpl<TimePeriod, AggregatedTicketScore>;

        await getAggregatedTicketScore(call).then(() => {
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
            write: (chunk: AggregatedTicketScore) => {
                response.push(chunk.toObject());
            },
            end: () => {},
            destroy: (err: ServerErrorResponse) => {
                error = err;
            },
            emit: (e, meta) => { event = e, metadata = meta},
        } as ServerWritableStreamImpl<TimePeriod, AggregatedTicketScore>;

        await getAggregatedTicketScore(call).then(() => {
            expect(event).toBe('error');
            expect(metadata.code).toBe(5);
            expect(metadata.details).toBe('no ratings in provided period');
        });
    });
});