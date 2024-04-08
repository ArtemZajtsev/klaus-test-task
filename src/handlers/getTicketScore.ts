// payload example
// {
// 	"ticketId": 283728 
// }

// {
// 	"ticketId": 129177 
// }
import * as grpc from "@grpc/grpc-js";
import { ServerErrorResponse, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { TicketCategoryRating, TicketId, TicketScore } from "../../proto/server/klaus_pb";
import { Db } from "../db";
import { RatingWithCategory } from "../types";
import { aggregateRatingsForScoring, getWeightedScore } from "../utils";

const db = Db.getDbConnectionInstance();

export async function getTicketScore(
    call: ServerUnaryCall<TicketId, TicketScore>,
    callback: sendUnaryData<TicketScore>
) {
    try {
        const ticketId = call.request.getTicketid();
        const ticketRatings = await db.getRatingsWithCategoriesByTicketId(ticketId);

        if (!ticketRatings.length) {
            callback({code: grpc.status.NOT_FOUND, details: `ticket id ${ticketId} not found`});
        }

        const weightedTicketScore = getWeightedScore(aggregateRatingsForScoring(ticketRatings));

        const ticketCategoryRatingList: TicketCategoryRating[] = [];
        ticketRatings.forEach((rating: RatingWithCategory) => {
            const ticketCategoryRating = new TicketCategoryRating();
            ticketCategoryRating.setRatingcategoryname(rating.name);
            ticketCategoryRating.setRating(rating.rating);
            // js is weird with floats, mess up numbers on client, thus i used string for weights
            ticketCategoryRating.setWeight(Number(rating.weight).toString());
            ticketCategoryRatingList.push(ticketCategoryRating);
        });

        const ticketScore = new TicketScore();
        ticketScore.setTickettotalscore(weightedTicketScore);
        ticketScore.setTicketcategoryratingList(ticketCategoryRatingList);

        return callback(null,  ticketScore);
    } catch (err) {
        callback(err as ServerErrorResponse, null);
    }
}