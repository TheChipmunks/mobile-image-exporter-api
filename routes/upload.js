import {Router} from 'express';
import formidable from 'formidable';
import fs from 'fs';
import config from '../config/config';

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        try {
            let form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (!files.image) {
                    return res.json({
                        status: false,
                        message: 'Select any image'
                    });
                }

                var dir = config.filePath;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                var oldpath = files.image.path;
                var newpath = dir + files.image.name;
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        status: true,
                        message: 'File uploaded!'
                    });
                });
            });
        } catch (error) {
            next(error);
        }
    }
);

export default router;