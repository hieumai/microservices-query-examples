import express from 'express';
import deliveries from './deliveries';
import shippers from './shippers';

const router = express.Router();

router.use('/deliveries', deliveries);
router.use('/shippers', shippers);

export default router;
