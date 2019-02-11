import express from 'express';
import tickets from './tickets';
import restaurants from './restaurants';

const router = express.Router();

router.use('/tickets', tickets);
router.use('/restaurants', restaurants);

export default router;
