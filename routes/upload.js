import {Router} from 'express';
import formidable from 'formidable';
import AWS from 'aws-sdk'

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        try {
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
                    region: 'eu-central-1',
                    accessKeyId: 'AKIAJ6VOI6YYN65YG2TA',
                    secretAccessKey: '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',
                };

                const s3 = new AWS.S3(params);

                const uploadFile = () => {
                    if (err) throw err;
                    const params = {
                        Bucket: 'comroads',
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
            // });
        } catch (error) {
            next(error);
        }
    }
);

export default router;