import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Ticket = mongoose.model('Ticket');

/**
 * Find employees by criteria
 */
router.get('/', (req, res, next) => {
  return Ticket.find(req.query)
    .then(tickets => res.json(tickets)).catch(next);
});

/**
 * Get employee by id
 */
router.get('/:id', (req, res, next) => {
  Ticket.findById(req.params.id)
    .then(ticket => !ticket.id ? res.sendStatus(404) : res.json(ticket))
    .catch(next);
});

module.exports = router;
