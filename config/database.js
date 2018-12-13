import config from './index';
import mysql from 'mysql';

const {
	SERVER: {
		DB: { HOST, USER, PORT, PASS, NAME, CONNECTION_LIMIT }
	}
} = config;

const dbConnection = class {
	constructor() {
		this.pool = null;
	}

	createDBPool() {
		this.pool = mysql.createPool({
			host: HOST,
			user: USER,
			port: PORT,
			password: PASS,
			database: NAME,
			connectionLimit: CONNECTION_LIMIT
		});
	}
};

const database = new dbConnection();

export default database;
