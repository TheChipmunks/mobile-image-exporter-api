import { Router } from 'express';
import uploadRoutes from './upload';
import authRoutes from './auth';

const router = Router();


router.use('/upload', uploadRoutes);
router.use('/auth', authRoutes);
router.all('*', (req, res, next) => {
	res.status(404).json({ message: 'Not found route' });
});

export default router;
