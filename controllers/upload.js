import database from "../config/database";

const getCredentials = async ({ device_id }) =>
    new Promise((res, rej) => {
        database.pool.query(
            `SELECT * FROM users_credentials 
        WHERE device_id='${device_id}'`,
            (error, result) => {
                if (error) rej({ status: 500, message: error });
                else res(result);
            }
        );
    });


export default {
    async getCredentials({ device_id }) {
        return await getCredentials({ device_id });
    },
};

