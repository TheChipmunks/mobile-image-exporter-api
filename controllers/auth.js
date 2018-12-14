import database from '../config/database';

const setCredentials = async ({ data }) =>
    new Promise((res, rej) => {
        database.pool.query(
            `INSERT INTO users_credentials(device_id, access_key, secret_key, bucket, region, date_added) VALUES('${data.device_id}', '${data.access_key}', '${data.secret_key}', '${data.bucket}', '${data.region}', NOW())`,
            error => {
                if (error) rej({status: 500, message: error});
                res();
            }
        );
    });

const FormParse = async ({form, req}) =>
    new Promise((res, rej) => {
        if (!req.headers['x-device-id'] && req.headers['x-device-id'] == '') {
            res({
                status: false,
                message: 'Device ID is required'
            });
        }

        form.parse(req, function (err, fields) {
            if (err) {
                res({
                    status: false,
                    message: err
                });
            }

            var device_id = req.headers['x-device-id'];
            var access_key = fields.access_key;
            var secret_key = fields.secret_key;
            var bucket = fields.bucket;
            var region = fields.region;

            if (!access_key || !secret_key || !bucket || !region) {
                res ({
                    status: false,
                    message: 'All fields are required'
                });
            }

            res({device_id, access_key, secret_key, bucket, region});
        })
    });


    export default {
        async putCredentials({ data }) {
            return await setCredentials({ data });
        },

        async FormParse({form, req}) {
            return await FormParse({form, req});
        }
    };

