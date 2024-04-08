import { ServerErrorResponse, sendUnaryData } from "@grpc/grpc-js";
import { ServerUnaryCallImpl } from "@grpc/grpc-js/build/src/server-call";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { OverallScore, TimePeriod } from "../../proto/server/klaus_pb";
import { getOverallScore } from "../../src/handlers/getOverallScore";

describe('getOverallScore', () => {
    it('calculates overall weighted score correctly', async () => {
        const timePeriod = new TimePeriod()
            .setStartdate(new Timestamp().setSeconds(1563310800))
            .setEnddate(new Timestamp().setSeconds(1563325200));

        const call = {
            request: timePeriod
        } as ServerUnaryCallImpl<TimePeriod, OverallScore>;

        let error: ServerErrorResponse;
        let response: OverallScore;

        await getOverallScore(call, ((
            err: ServerErrorResponse,
            res: OverallScore,
        ) => {
            error = err;
            response = res;
        }) as sendUnaryData<OverallScore>).then(() => {
            expect(error).toBe(null);
            expect(response.toObject().overallscore).toBe(55);
        });
    });

    it('throws if start date is empty', async () => {
        const timePeriod = new TimePeriod()
        .setEnddate(new Timestamp().setSeconds(2));

        const call = {
            request: timePeriod
        } as ServerUnaryCallImpl<TimePeriod, OverallScore>;

        let error: ServerErrorResponse;
        let response: OverallScore;

        await getOverallScore(call, ((err: ServerErrorResponse, res: OverallScore) => {
            error = err;
            response = res;
        }) as sendUnaryData<any>).then(() => {
            expect(error.message).toBe('start date is empty');
            expect(response).toBe(null);
        });
    });

    it('throws if end date is empty', async () => {
        const timePeriod = new TimePeriod()
        .setStartdate(new Timestamp().setSeconds(1));

        const call = {
            request: timePeriod
        } as ServerUnaryCallImpl<TimePeriod, OverallScore>;

        let error: ServerErrorResponse;
        let response: OverallScore;

        await getOverallScore(call, ((err: ServerErrorResponse, res: OverallScore) => {
            error = err;
            response = res;
        }) as sendUnaryData<any>).then(() => {
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
        } as ServerUnaryCallImpl<TimePeriod, OverallScore>;

        let error: ServerErrorResponse;
        let response: OverallScore;

        await getOverallScore(call, ((err: ServerErrorResponse, res: OverallScore) => {
            error = err;
            response = res;
        }) as sendUnaryData<any>).then(() => {
            expect(error.message).toBe('start date cant be after end date');
            expect(response).toBe(null);
        });
    });
});
