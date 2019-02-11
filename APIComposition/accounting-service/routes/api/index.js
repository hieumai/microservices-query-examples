import express from 'express';
import bills from './bills';

const router = express.Router();

router.use('/bills', bills);

export default router;
