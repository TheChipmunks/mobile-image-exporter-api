import { Router } from 'express';
// import coinsRoutes from "./coins";
import uploadRoutes from './upload';
// import coinsRoutes from './coins';
// import newsRoutes from './news';
// import trackerRoutes from './tracker';

const router = Router();

// router.use("/coins", coinsRoutes);
router.use('/upload', uploadRoutes);
// router.use('/coins', coinsRoutes);
// router.use('/news', newsRoutes);
// router.use('/tracker', trackerRoutes);
router.all('*', (req, res, next) => {
	res.status(404).json({ message: 'Not found route' });
});

export default router;
