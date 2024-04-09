## General

This is my first time using gRPC. Initially i started with dynamic proto codegen becasue most of the tutorials use it, but down the line switched to static code gen since it provides classes and types i needed for easier development. When dockerizing decided not to mount db since we dont need persistence storage here, i just copied db file over.

If there are any changes in [klaus.proto](./proto/klaus.proto) one have to re-run `npm run generate-server-proto` to re generate files. Also dont forget to import updated klaus.proto into your postman/insomnia.

## How to run

### Locally

Install dependencies `npm i`. 

Run `npm run generate-server-proto` to generate types and classes from .proto file

Start server with `ts-node src/index.ts`

Server will listen on `0.0.0.0:42069`

### Docker

Run `docker compose up --build`

Server will listen on `0.0.0.0:42069`

## How to query endpoints

Import [klaus.proto](./proto/klaus.proto) into your postman/insomnia. Check example payloads in Tasks section. Enjoy.

## Tasks

### 1
Come up with ticket score algorithm that accounts for rating category weights (available in `rating_categories` table). Ratings are given in a scale of 0 to 5. Score should be representable in percentages from 0 to 100.

Algorithm can be seen implemented in [utils.js](./src/utils.ts) file in `getWeightedScore` function. Basic idea is that we sum up all weighted ratings and divide it by (sum of all weights * maximum rating), and multiply it by 100 to get percentage format. Also round it up.

Formula:

$$round({ \sum (categoryWeight*rating) \over \sum (allWeightsUsedInRatings) * maxScore} * 100)$$

Used it in [getTicketScore.ts](./src/handlers/getTicketScore.ts) endpoint handler. It calculates and returns weighted score for selected ticket along with categories and their weights for easier manual testing. Unary response

Example payload:
```json
{
	"ticketId": 129177
}
```

Example response:
```json
{
	"ticketCategoryRating": [
		{
			"ratingCategoryName": "Spelling",
			"rating": 1,
			"weight": "1"
		},
		{
			"ratingCategoryName": "Grammar",
			"rating": 4,
			"weight": "0.7"
		},
		{
			"ratingCategoryName": "GDPR",
			"rating": 3,
			"weight": "1.2"
		},
		{
			"ratingCategoryName": "Randomness",
			"rating": 2,
			"weight": "0"
		}
	],
	"ticketTotalScore": 51
}
```

### 2
**Aggregated category scores over a period of time**

Implemented in [getAggregatedCategoryScore.ts](./src/handlers/getAggregatedCategoryScore.ts). Use server writable stream and returns each category when its ready. Splits period by weeks if requested time period > 30 days. Since we score categories separately i used average scoring, not weighted, since there are no other categories for category score to weight with.

Example payload:
```json
{
	"startDate": {
		"seconds": 1563310800,
		"nanos": 0
	},
	"endDate": {
		"seconds": 1563332400,
		"nanos": 0
	}
}
```

Example response: there are separate responses for each caetgory since it is a stream
```json
{
	"periodScore": [
		{
			"period": "Wed Jul 17 2019",
			"score": 36
		},
		{
			"period": "Tue Jul 16 2019",
			"score": 60
		}
	],
	"id": 1,
	"category": "Spelling",
	"ratingCount": 7,
	"score": 43
}
```

**Scores by ticket**

Implemented in [getAggregatedTicketScore.ts](./src/handlers/getAggregatedTicketScore.ts). Use server writable stream and returns each ticket when its ready. Since we score categories separately i used average scoring, not weighted, since there are no other categories for category scroe to weight with.

Example payload:
```json
{
	"startDate": {
		"seconds": 1563310800,
		"nanos": 0
	},
	"endDate": {
		"seconds": 1563332400,
		"nanos": 0
	}
}
```

Example response: there are separate responses for each ticket since it is a stream
```json
{
	"ticketCategoryScore": [
		{
			"id": 1,
			"name": "Spelling",
			"score": 20
		},
		{
			"id": 2,
			"name": "Grammar",
			"score": 80
		},
		{
			"id": 3,
			"name": "GDPR",
			"score": 60
		},
		{
			"id": 4,
			"name": "Randomness",
			"score": 40
		}
	],
	"ticketId": 129177
}
```

**Overall quality score**

Implemented in [getOverallScore.ts](./src/handlers/getOverallScore.ts). Calculates and return weighted score for all ratings in provided time period. Unary response.

Example payload:
```json
{
	"startDate": {
		"seconds": 1563310800,
		"nanos": 0
	},
	"endDate": {
		"seconds": 1563332400,
		"nanos": 0
	}
}
```

Example response:
```json
{
	"overallScore": 52
}
```

**Period over Period score change**

Implemented in [getScoreChangeAgainstPreviousPeriod.ts](./src/handlers/getScoreChangeAgainstPreviousPeriod.ts). Calculates previous period (same duration as provided in payload but before it on the timeline), calculates weighted scores for both (same as overall score endpoint previously), and returns absolute and relative change in score between periods. Wasnt sure what task actually wanted so decided to return both absolute (a - b) and relative (a - b ) / b. Unary response.

Example payload:
```json
{
	"startDate": {
		"seconds": 1563310800,
		"nanos": 0
	},
	"endDate": {
		"seconds": 1563332400,
		"nanos": 0
	}
}
```

Example response:
```json
{
	"scoreChangeAbsolute": -2,
	"scoreChangePercentageChange": -4
}
```

## Improvements 

* Tests are lacking, honestly i struggled to set them up. Also, didnt figure out how to test early callbacks with errors in unary endpoints for example in [getOverallScore](./src/handlers/getOverallScore.ts#L30).
* Maybe there is a smarter and more efficient way to do aggregations in `getAggregatedTicketScore.ts` and `getAggregatedCategoryScore.ts`, but i didnt see it and the way i did is quite readable and undesrtandable i think.
* Not sure about error management too, in some part i throw good old `throw new Error()` and in some i use grpc statuses and throw with `stream.emit` or `callback`. Probably could be more unified.