import express from 'express';
import rp from 'request-promise-native';
import { from, forkJoin } from 'rxjs';
import { reduce, map } from 'rxjs/operators';
import { SERVICES_CONNECT_OPTIONS } from '../../constants';

const router = express.Router();

/**
 * Find order details by id by invoke multiple services
 */
router.get('/:id', async (req, res, next) => {
  try {
    const ticketObservable = from(rp(SERVICES_CONNECT_OPTIONS.kitchenOptions(`tickets?orderId=${req.params.id}`)))
      .pipe(map(tickets => {
        const result = (tickets && tickets.length > 0) ? tickets[0] : null;
        return { ticket: result }
      }));
    const billObservable = from(rp(SERVICES_CONNECT_OPTIONS.accountingOptions(`bills?orderId=${req.params.id}`)))
      .pipe(map(bills => {
        const result = (bills && bills.length > 0) ? bills[0] : null;
        return { bill: result }
      }));

    const deliveryObservable = from(rp(SERVICES_CONNECT_OPTIONS.delivery(`deliveries?orderId=${req.params.id}`)))
      .pipe(map(deliveries => {
        const result = (deliveries && deliveries.length > 0) ? deliveries[0] : null;
        return { delivery: result }
      }));

    const orderObservable = from(rp(SERVICES_CONNECT_OPTIONS.order(`orders/${req.params.id}`)))
      .pipe(map(order => { return { order } }));

    const example = forkJoin(ticketObservable, billObservable, deliveryObservable, orderObservable);
    example.subscribe(val => {
      const result = val.reduce((acc, item) => {
        return {
          ...acc,
          ...item
        }
      });
      res.json(result);
    });
  } catch (error) {
    next(error);
  }
});

export default router;
