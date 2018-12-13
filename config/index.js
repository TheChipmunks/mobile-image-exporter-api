import dotenv from 'dotenv';
dotenv.config();

export default {
	SERVER: {
		DB: {
			HOST: process.env.DB_HOST || '127.0.0.1',
			USER: process.env.DB_USER || 'root',
			PORT: process.env.DB_PORT || 3306,
			PASS: process.env.DB_PASS || '',
			NAME: process.env.DB_NAME || 'homestead',
			CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 100
		},

		PORT: process.env.PORT || 3000,
		API_VERSION: `/api`,
	}
};
