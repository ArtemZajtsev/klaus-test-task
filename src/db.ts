import knex from 'knex';

let db: Db;

export class Db {
	client: knex.Knex;

	private constructor(knex: any) {
		this.client = knex;
	}

	static getDbConnectionInstance(): Db {
		if (!db) {
			const knexClient = knex.knex({
				client: 'sqlite3',
				useNullAsDefault: true,
				connection: {
					filename: './database.db'
				}
			});

			db = new Db(knexClient);
		}

		return db;
	}

	public getRatingsWithCategoriesByTicketId(tickedId: number) {
		return this.client.raw(
			'SELECT * ' +
				'FROM ratings as r ' +
				'JOIN rating_categories as rc ' +
				'ON r.rating_category_id = rc.id ' +
				`WHERE r.ticket_id = ${tickedId} `
		);
	}

	public getRatingsWithCategoriesByPeriod(
		startTime: number,
		endTime: number
	) {
		return this.client.raw(
			'SELECT * ' +
				'FROM ratings as r ' +
				'JOIN rating_categories as rc ' +
				'ON r.rating_category_id = rc.id ' +
				`WHERE unixepoch(r.created_at) BETWEEN ${startTime} AND ${endTime} `
		);
	}

	public getRatingCategories() {
		return this.client.raw('SELECT * FROM rating_categories ');
	}
}
