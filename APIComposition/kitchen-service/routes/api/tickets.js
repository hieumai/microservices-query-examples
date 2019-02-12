import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Ticket = mongoose.model('Ticket');

/**
 * Find tickets by criteria
 */
router.get('/', (req, res, next) => {
  return Ticket.find(req.query)
    .then(tickets => res.json(tickets)).catch(next);
});

/**
 * Find ticket by id
 */
router.get('/:id', (req, res, next) => {
  const query = { id: req.params.id };
  Ticket.findOne(query)
    .then(ticket => !ticket ? res.sendStatus(404) : res.json(ticket))
    .catch(next);
});

export default router;
