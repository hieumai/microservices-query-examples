import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Restaurant = mongoose.model('Restaurant');

/**
 * Find restaurants by criteria
 */
router.get('/', (req, res, next) => {
  return Restaurant.find(req.query, { '_id': 0 })
    .then(restaurants => res.json(restaurants)).catch(next);
});

/**
 * Find restaurant by id
 */
router.get('/:id', (req, res, next) => {
  const query = { id: req.params.id };
  Restaurant.findOne(query, { '_id': 0 })
    .then(restaurant => !restaurant ? res.sendStatus(404) : res.json(restaurant))
    .catch(next);
});

export default router;
