'use strict';

import config from './config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import database from './config/database';
import router from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create DB pool
database.createDBPool();
// init router
app.use(config.SERVER.API_VERSION, router);

app.listen(config.SERVER.PORT, () => {
    console.info(`[Server] Application Listening on Port ${config.SERVER.PORT}`);
});