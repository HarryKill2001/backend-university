const pg = require("pg");
const config = require("../config/config.json");

class postgresService {
	constructor() {
		this.connectionString =
    `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
		this.pool = new pg.Pool({connectionString: this.connectionString});
	}

	async executeSQL(sql) {
		let result = await this.pool.query(sql);
		return result;
	}

	async executeSQLData(sql, data) {
		let result = await this.pool.query(sql, data);
		return result;
	}
}

module.exports = postgresService;
