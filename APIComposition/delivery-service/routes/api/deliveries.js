import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Delivery = mongoose.model('Delivery');
const Shipper = mongoose.model('Shipper')

/**
 * Find employees by criteria
 */
router.get('/', async (req, res, next) => {
  try {
    const deliveries = await Delivery.find(req.query, { '_id': 0 });
    const shippers = await Shipper.find(null, { '_id': 0 })
    const mappedDeliveries = deliveries.map(delivery => {
      if (!delivery.shipperId) {
        return delivery;
      }
      const shipper = shippers.find(shipper => shipper.id === delivery.shipperId);
      return {
        ...delivery.toObject(),
        shipper
      };
    });
    return res.json(mappedDeliveries);
    res.json(deliveries)
  } catch (error) {
    next(error);
  }
});

/**
 * Get employee by id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const query = { id: req.params.id };
    const delivery = await Delivery.findOne(query, { '_id': 0 });
    if (!delivery) {
      res.sendStatus(404);
      return;
    }
    const shipper = await Shipper.findOne({ id: delivery.shipperId }, { '_id': 0 });
    res.json({
      ...delivery.toObject(),
      shipper
    });
  } catch (error) {
    next(error);
  }
});

export default router;
