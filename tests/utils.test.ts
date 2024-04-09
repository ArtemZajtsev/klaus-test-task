import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { TimePeriod } from "../proto/server/klaus_pb";
import { RatingWithCategory } from "../src/types";
import { aggregateRatingsForScoring, calculateAverageScore, getPreviousPeriod, getStartEndDate, getWeekNumber, getWeightedScore } from "../src/utils";

describe('utils', () => {
    describe('getStartEndDate', () => {
        it('retunrns start end date', () => {
            const timePeriod = new TimePeriod()
                .setStartdate(new Timestamp().setSeconds(1))
                .setEnddate(new Timestamp().setSeconds(2));

            const [startDate, endDate] = getStartEndDate(timePeriod);

            expect(startDate).toBe(1);
            expect(endDate).toBe(2);
        });

        it('throws if there is no start date', () => {
            const timePeriod = new TimePeriod()
                .setEnddate(new Timestamp().setSeconds(2));
            let error: any;

            try {
                getStartEndDate(timePeriod);
            } catch (err: any) {
                error = err;
            }

            expect(error.message).toBe('start date is empty');
        });

        it('throws if there is no end date', () => {
            const timePeriod = new TimePeriod()
                .setStartdate(new Timestamp().setSeconds(1));
            let error: any;

            try {
                getStartEndDate(timePeriod);
            } catch (err: any) {
                error = err;
            }

            expect(error.message).toBe('end date is empty');
        });

        it('throws if start date after end date', () => {
            const timePeriod = new TimePeriod()
                .setStartdate(new Timestamp().setSeconds(2))
                .setEnddate(new Timestamp().setSeconds(1));
            let error: any;

            try {
                getStartEndDate(timePeriod);
            } catch (err: any) {
                error = err;
            }

            expect(error.message).toBe('start date cant be after end date');
        });
    });

    describe('calculateAverageScore', () => {
        it('calculates average correctly', () => {
            const res = calculateAverageScore(20, 4);

            expect(res).toBe(100);
        });

        it('throws if ratings count is 0', () => {
            let error: any;

            try {
                calculateAverageScore(20, 0);
            } catch(err) {
                error = err;
            }
            
            expect(error.message).toBe('cant calculate score for 0 ratings');
        });
    });

    describe('getWeekNumber', () => {
        it('gives you correct week number', () => {
            const week = getWeekNumber(new Date('January 3, 2000 00:00:00'))

            expect(week).toBe('Week 1');
        });
    });

    describe('aggregateRatingsForScoring', () => {
        const ratings: RatingWithCategory[] = [
            {
                id: 1,
                rating: 1,
                ticket_id: 1,
                rating_category_id: 1,
                reviewer_id: 1,
                reviewee_id: 1,
                created_at: 'sometime',
                name: 'category 1 name', 
                weight: 1,
            },
            {
                id: 2,
                rating: 2,
                ticket_id: 2,
                rating_category_id: 2,
                reviewer_id: 2,
                reviewee_id: 2,
                created_at: 'some other time',
                name: 'category 2 name',
                weight: 2
            },
            {
                id: 3,
                rating: 3,
                ticket_id: 3,
                rating_category_id: 1,
                reviewer_id: 3,
                reviewee_id: 3,
                created_at: 'some another time',
                name: 'category 1 name',
                weight: 4
            }
        ];

        it('aggregates ratings correctly', () => {
            const res = aggregateRatingsForScoring(ratings);

            expect(res).toEqual({
                '1': { weight: 1, ratings: [ 1, 3 ] },
                '2': { weight: 2, ratings: [ 2 ] }
            });
        });
    });

    describe('getWeightedScore', () => {
        const ratingsAggregatedForScoring = {
            '1': { weight: 1, ratings: [ 1, 2, 3 ] },
            '2': { weight: 2, ratings: [ 2, 4, 5 ] }
        };

        it('calculates weighted score correctly', () => {
            const res = getWeightedScore(ratingsAggregatedForScoring);

            expect(res).toBe(62);
        });
    });

    describe('getPreviousPeriod', () => {
        it('returns you previous period correctly', () => {
            const [prevStart, prevEnd] = getPreviousPeriod(200, 300);

            expect(prevStart).toBe(99);
            expect(prevEnd).toBe(199);
        })
    });
});