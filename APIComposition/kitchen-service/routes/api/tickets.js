import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Ticket = mongoose.model('Ticket');
const Restaurant = mongoose.model('Restaurant');

/**
 * Find tickets by criteria
 */
router.get('/', async (req, res, next) => {
  try {
    const tickets = await Ticket.find(req.query, { '_id': 0 });
    const restaurants = await Restaurant.find(null, { '_id': 0 });
    const mappedTickets = tickets.map(ticket => {
      if (!ticket.restaurantId) {
        return ticket;
      }
      const restaurant = restaurants.find(restaurant => restaurant.id === ticket.restaurantId);
      return {
        ...ticket.toObject(),
        restaurant
      };
    });
    return res.json(mappedTickets);
  } catch (error) {
    next(error);
  }
});

/**
 * Find ticket by id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const query = { id: req.params.id };
    const ticket = await Ticket.findOne(query, { '_id': 0 });
    if (!ticket) {
      res.sendStatus(404);
      return;
    }
    const restaurant = await Restaurant.findOne({ id: ticket.restaurantId }, { '_id': 0 });
    res.json({
      ...ticket.toObject(),
      restaurant
    });
  } catch (error) {
    next(error);
  }
});

export default router;
