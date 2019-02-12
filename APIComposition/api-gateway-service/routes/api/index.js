import express from 'express';
import orderDetails from './orderDetails';

const router = express.Router();

router.use('/order-details', orderDetails);

export default router;
