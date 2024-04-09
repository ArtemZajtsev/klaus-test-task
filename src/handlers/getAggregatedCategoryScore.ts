// payload example
// {
// 	"startDate": {
// 		"seconds": 1563310800,
// 		"nanos": 0
// 	},
// 	"endDate": {
// 		"seconds": 1563332400,
// 		"nanos": 0
// 	}
// }
import * as grpc from '@grpc/grpc-js';
import { ServerWritableStream } from '@grpc/grpc-js';
import {
	AggregatedCategoryScore,
	PeriodScore,
	TimePeriod
} from '../../proto/server/klaus_pb';
import { Db } from '../db';
import { RatingWithCategory, RatingsAggregatedByCategory } from '../types';
import {
	MONTH_IN_SECONDS,
	calculateAverageScore,
	getStartEndDate,
	getWeekNumber
} from '../utils';

const db = Db.getDbConnectionInstance();

export async function getAggregatedCategoryScore(
	call: ServerWritableStream<TimePeriod, AggregatedCategoryScore>
) {
	try {
		const [startDate, endDate] = getStartEndDate(call.request);
		const ratingsToAggregate: RatingWithCategory[] =
			await db.getRatingsWithCategoriesByPeriod(startDate, endDate);

		if (!ratingsToAggregate.length) {
			call.emit('error', {
				code: grpc.status.NOT_FOUND,
				details: 'no ratings in provided period'
			});
		}

		const moreThanMonth = endDate - startDate > MONTH_IN_SECONDS;
		const ratingsAggregatedByCategory: RatingsAggregatedByCategory = {};

		// aggregate ratings based on category
		ratingsToAggregate.forEach((ratingWithCategory: RatingWithCategory) => {
			// rating date to Tue Jul 16 2019 or Week 1 format to separate periods
			const period = moreThanMonth
				? getWeekNumber(new Date(ratingWithCategory.created_at))
				: new Date(ratingWithCategory.created_at).toDateString();
			const currentCategoryId = ratingWithCategory.rating_category_id;

			if (!ratingsAggregatedByCategory[currentCategoryId]) {
				ratingsAggregatedByCategory[currentCategoryId] = {
					ratingsCount: 1,
					ratingsSum: ratingWithCategory.rating,
					name: ratingWithCategory.name,
					ratingsByPeriod: {
						[period]: [ratingWithCategory.rating]
					}
				};
			} else {
				ratingsAggregatedByCategory[currentCategoryId].ratingsCount++;
				ratingsAggregatedByCategory[currentCategoryId].ratingsSum +=
					ratingWithCategory.rating;
				ratingsAggregatedByCategory[currentCategoryId].ratingsByPeriod[
					period
				]
					? ratingsAggregatedByCategory[
							currentCategoryId
						].ratingsByPeriod[period].push(
							ratingWithCategory.rating
						)
					: (ratingsAggregatedByCategory[
							currentCategoryId
						].ratingsByPeriod[period] = [
							ratingWithCategory.rating
						]);
			}
		});

		for (const [categoryId, aggregatedCategory] of Object.entries(
			ratingsAggregatedByCategory
		)) {
			const categoryPeriodScores: PeriodScore[] = [];

			for (const [periodName, periodRatings] of Object.entries(
				aggregatedCategory.ratingsByPeriod
			)) {
				const periodScore = new PeriodScore();
				const periodRatingsSum = periodRatings.reduce((acc, val) => {
					return acc + val;
				}, 0);
				const periodScoreValue = calculateAverageScore(
					periodRatingsSum,
					periodRatings.length
				);
				periodScore.setPeriod(periodName);
				periodScore.setScore(periodScoreValue);

				categoryPeriodScores.push(periodScore);
			}

			const aggregatedCategoryScore = new AggregatedCategoryScore();
			aggregatedCategoryScore.setId(Number(categoryId));
			aggregatedCategoryScore.setCategory(aggregatedCategory.name);
			aggregatedCategoryScore.setRatingcount(
				aggregatedCategory.ratingsCount
			);
			aggregatedCategoryScore.setPeriodscoreList(categoryPeriodScores);
			aggregatedCategoryScore.setScore(
				calculateAverageScore(
					aggregatedCategory.ratingsSum,
					aggregatedCategory.ratingsCount
				)
			);

			call.write(aggregatedCategoryScore);
		}

		call.end();
	} catch (err: any) {
		call.destroy(err);
	}
}
