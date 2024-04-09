import type { TimePeriod } from '../proto/server/klaus_pb';
import type { RatingWithCategory, RatingsAggregatedForScoring } from './types';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
export const MONTH_IN_SECONDS = 30 * ONE_DAY_IN_SECONDS;
export const MAX_RATING = 5;

export function getStartEndDate(timePeriod: TimePeriod) {
	const startDate = timePeriod.getStartdate()?.getSeconds();
	const endDate = timePeriod.getEnddate()?.getSeconds();

	if (!startDate) {
		throw new Error('start date is empty');
	}

	if (!endDate) {
		throw new Error('end date is empty');
	}

	if (startDate > endDate) {
		throw new Error('start date cant be after end date');
	}

	return [startDate, endDate];
}

export function calculateAverageScore(
	ratingsSum: number,
	ratingsCount: number
): number {
	if (ratingsCount === 0) {
		throw new Error('cant calculate score for 0 ratings');
	}

	return Math.round((ratingsSum / ratingsCount) * 20);
}

export function getWeekNumber(date: Date) {
	const millisecondsInDay = 86400000; // 1000ms * 60s * 60m * 24h
	const firstDayOfWeek = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);

	// The first week in the ISO definition starts with a week containing thursday.
	// This means we add 4 (thursday) and minus the current day of the week (UTC day || 7 (if UTC day is 0, which is sunday)) to the current UTC date
	firstDayOfWeek.setUTCDate(
		firstDayOfWeek.getUTCDate() + 4 - (firstDayOfWeek.getUTCDay() || 7)
	);

	const firstDayOfYear = new Date(
		Date.UTC(firstDayOfWeek.getUTCFullYear(), 0, 1)
	);
	// @ts-expect-error: you can substract dates
	const timeDifference = firstDayOfWeek - firstDayOfYear;
	const daysDifference = timeDifference / millisecondsInDay;

	return `Week ${Math.ceil(daysDifference / 7)}`;
}

export function aggregateRatingsForScoring(
	ratings: RatingWithCategory[]
): RatingsAggregatedForScoring {
	const aggregatedRatings: RatingsAggregatedForScoring = {};
	// gather ratings and weights to calculate weighted score later
	ratings.forEach((rating: RatingWithCategory) => {
		const ratingCategoryId = rating.rating_category_id;

		if (!aggregatedRatings[ratingCategoryId]) {
			aggregatedRatings[ratingCategoryId] = {
				weight: rating.weight,
				ratings: [rating.rating]
			};
		} else {
			aggregatedRatings[ratingCategoryId].ratings.push(rating.rating);
		}
	});

	return aggregatedRatings;
}

export function getWeightedScore(
	ratingsAggregatedForScoring: RatingsAggregatedForScoring
): number {
	let totalRatingsWeightedSum = 0;
	let totalWeight = 0;

	for (const [, categoryAggregated] of Object.entries(ratingsAggregatedForScoring)) {
		const categoryRatingsWeightedSum = categoryAggregated.ratings.reduce(
			(acc, val) => {
				totalWeight += categoryAggregated.weight;
				return acc + val * categoryAggregated.weight;
			},
			0
		);

		totalRatingsWeightedSum += categoryRatingsWeightedSum;
	}

	return Math.round(
		(totalRatingsWeightedSum / (totalWeight * MAX_RATING)) * 100
	);
}

export function getPreviousPeriod(startDate: number, endDate: number) {
	const periodDuration = endDate - startDate;
	const previousPeriodStartDate = startDate - periodDuration;

	// - 1 so that previous end date would not overlap with current start date
	return [previousPeriodStartDate - 1, startDate - 1];
}
