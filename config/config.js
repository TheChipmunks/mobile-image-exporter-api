const path = require('path');

require('dotenv').config({path:path.join(__dirname, '../', 'process.env')});

const config = {
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USER,
    db_port: process.env.DB_PORT,
    db_password: process.env.DB_PASS,
    db_name: process.env.DB_NAME,
    filePath: process.env.UPLOAD_DIR,
    port: process.env.PORT || `5678`
};

module.exports = config;