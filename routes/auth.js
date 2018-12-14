import {Router} from 'express';
import formidable from 'formidable';
import authController from '../controllers/auth';

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        try {
            let form = new formidable.IncomingForm();
            const data = await authController.FormParse({
                form, req
            });

            if (data.status == false) {
                return res.status(400).json({ data })
            }

            await authController.putCredentials({ data} );

            res.status(202).json();
        } catch (error) {
            next(error);
        }
    }
);

export default router;