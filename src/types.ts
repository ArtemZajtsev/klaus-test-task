export type RatingWithCategory = {
    id: number,
    rating: number,
    ticket_id: number,
    rating_category_id: number,
    reviewer_id: number,
    reviewee_id: number,
    created_at: string,
    name: string // category names to enum?
    weight: number
};

export type AggregatedCategory = {
    name: string,
    ratingsCount: number,
    ratingsSum: number,
    ratingsByPeriod: {
        [periodName: string]: number[]
    },
}

export type RatingsAggregatedByCategory = {
    [categoryName: string]: AggregatedCategory
};

export type RatingCategoryFromDb = {
    id: number,
    name: string,
    weight: number,
}


export type TicketsCategoriesWithRatings = {
    [categoryId: string]: {
        categoryName: string,
        ratings: number[],
    }
}

export type RatingsAggregatedByTicket = {
    [ticketId: string]: TicketsCategoriesWithRatings,
}

export type RatingsAggregatedForScoring = {
    [categoryId: string]: {
        weight: number,
        ratings: number[]
    }
}