import {Router} from 'express';
import formidable from 'formidable';
import uploadController from '../controllers/upload';
import AWS from 'aws-sdk'

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        try {
            if (!req.headers['x-device-id'] && req.headers['x-device-id'] == '') {
                res({
                    status: false,
                    message: 'Device ID is required'
                });
            }

            var device_id = req.headers['x-device-id'];

            const data = await uploadController.getCredentials({device_id});

            if (!data[0]){
                return res.status(404).json({ status: false, message: 'Not such Device ID' });
            }

            const credentials = data;

            let form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (!files.image) {
                    return res.status(400).json({
                        status: false,
                        message: 'Select any image'
                    });
                }

                var filePath = files.image.path;
                var fileName = files.image.name;

                const params = {
                    region: credentials.region,
                    accessKeyId: credentials.access_key,
                    secretAccessKey: credentials.secret_key,
                };

                const s3 = new AWS.S3(params);

                const uploadFile = () => {
                    if (err) throw err;
                    const params = {
                        Bucket: credentials.bucket,
                        Key: fileName,
                        Body: JSON.stringify(filePath, null, 2)
                    };
                    s3.upload(params, function (s3Err, data) {
                        if (s3Err) {
                            return res.status(400).json({
                                status: false,
                                message: s3Err
                            });
                        }
                        return res.status(202).json({
                            status: true,
                            message: `File uploaded successfully at ${data.Location}`
                        });
                    });
                };
                uploadFile();
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;