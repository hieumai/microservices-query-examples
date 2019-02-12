import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Delivery = mongoose.model('Delivery');

/**
 * Find employees by criteria
 */
router.get('/', (req, res, next) => {
  return Delivery.find(req.query)
    .then(deliveries => res.json(deliveries)).catch(next);
});

/**
 * Get employee by id
 */
router.get('/:id', (req, res, next) => {
  const query = { id: req.params.id };
  Delivery.findOne(query)
    .then(delivery => !delivery ? res.sendStatus(404) : res.json(delivery))
    .catch(next);
});

export default router;
