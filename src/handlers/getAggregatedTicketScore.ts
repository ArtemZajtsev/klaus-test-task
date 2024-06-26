import type { ServerWritableStream } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import type { TimePeriod } from '../../proto/server/klaus_pb';
import {
	AggregatedTicketScore,
	TicketCategoryScore
} from '../../proto/server/klaus_pb';
import { Db } from '../db';
import type { RatingWithCategory, RatingsAggregatedByTicket } from '../types';
import { calculateAverageScore, getStartEndDate } from '../utils';

const db = Db.getDbConnectionInstance();

export async function getAggregatedTicketScore(
	call: ServerWritableStream<TimePeriod, AggregatedTicketScore>
) {
	// maybe a bit of an overkill because it looks like tickets are graded once in every category during time period
	// but im not sure if data is consistent with this rule, so i think its safer to calculate it the way i did
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

		const ratingsAggregatedByTicket: RatingsAggregatedByTicket = {};

		// aggregate ratings based on ticket id
		ratingsToAggregate.forEach((ratingWithCategory: RatingWithCategory) => {
			const currentTicketId = ratingWithCategory.ticket_id;
			const currentCategoryId = ratingWithCategory.rating_category_id;

			if (!ratingsAggregatedByTicket[currentTicketId]) {
				ratingsAggregatedByTicket[currentTicketId] = {};
			}

			if (!ratingsAggregatedByTicket[currentTicketId][currentCategoryId]) {
				ratingsAggregatedByTicket[currentTicketId][currentCategoryId] =
					{
						categoryName: ratingWithCategory.name,
						ratings: [ratingWithCategory.rating]
					};
			} else {
				ratingsAggregatedByTicket[currentTicketId][currentCategoryId].ratings.push(ratingWithCategory.rating);
			}
		});

		for (const [ticketId, ticketCategoriesWithRatings] of Object.entries(ratingsAggregatedByTicket)) {
			const ticketCategoryScoresList: TicketCategoryScore[] = [];

			for (const [categoryId, ticketCategory] of Object.entries(ticketCategoriesWithRatings)) {
				const ticketCategoryScore = new TicketCategoryScore();
				const ticketCategoryRatingsSum = ticketCategory.ratings.reduce(
					(acc, val) => {
						return acc + val;
					},
					0
				);
				const ticketCategoryScoreValue = calculateAverageScore(
					ticketCategoryRatingsSum,
					ticketCategory.ratings.length
				);
				ticketCategoryScore.setId(Number(categoryId));
				ticketCategoryScore.setName(ticketCategory.categoryName);
				ticketCategoryScore.setScore(ticketCategoryScoreValue);

				ticketCategoryScoresList.push(ticketCategoryScore);
			}

			const aggregatedTicketScore = new AggregatedTicketScore();
			aggregatedTicketScore.setTicketid(Number(ticketId));
			aggregatedTicketScore.setTicketcategoryscoreList(ticketCategoryScoresList);

			call.write(aggregatedTicketScore);
		}

		call.end();
	} catch (err: any) {
		call.destroy(err);
	}
}
