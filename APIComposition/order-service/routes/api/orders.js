import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Order = mongoose.model('Order');

/**
 * Find orders by criteria
 */
router.get('/', (req, res, next) => {
  return Order.find(req.query, { '_id': 0 })
    .then(orders => res.json(orders)).catch(next);
});

/**
 * Find order by id
 */
router.get('/:id', (req, res, next) => {
  const query = { id: req.params.id };
  Order.findOne(query, { '_id': 0 })
    .then(order => !order ? res.sendStatus(404) : res.json(order))
    .catch(next);
});

export default router;
