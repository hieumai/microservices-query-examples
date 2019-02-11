import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Bill = mongoose.model('Bill');

/**
 * Find bills by criteria
 */
router.get('/', (req, res, next) => {
  return Bill.find(req.query)
    .then(bills => res.json(bills)).catch(next);
});

/**
 * Find bill by id
 */
router.get('/:id', (req, res, next) => {
  Bill.findById(req.params.id)
    .then(bill => !bill.id ? res.sendStatus(404) : res.json(bill))
    .catch(next);
});

export default router;
