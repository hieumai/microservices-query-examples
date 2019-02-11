import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Shipper = mongoose.model('Shipper');

/**
 * Find employees by criteria
 */
router.get('/', (req, res, next) => {
  return Shipper.find(req.query)
    .then(shippers => res.json(shippers)).catch(next);
});

/**
 * Get employee by id
 */
router.get('/:id', (req, res, next) => {
  Shipper.findById(req.params.id)
    .then(shipper => !shipper.id ? res.sendStatus(404) : res.json(shipper))
    .catch(next);
});

export default router;
