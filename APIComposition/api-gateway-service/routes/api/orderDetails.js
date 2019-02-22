import express from 'express';
import rp from 'request-promise-native';
import { from, forkJoin, of } from 'rxjs';
import { reduce, map, catchError } from 'rxjs/operators';
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
        return { ticket: result };
      }), catchError((err) => {
        console.log('ticket error', err.message);
        return of({ ticket: null });
      }));
    const billObservable = from(rp(SERVICES_CONNECT_OPTIONS.accountingOptions(`bills?orderId=${req.params.id}`)))
      .pipe(map(bills => {
        const result = (bills && bills.length > 0) ? bills[0] : null;
        return { bill: result };
      }), catchError((err) => {
        console.log('bill error', err.message);
        return of({ bill: null });
      }));

    const deliveryObservable = from(rp(SERVICES_CONNECT_OPTIONS.delivery(`deliveries?orderId=${req.params.id}`)))
      .pipe(map(deliveries => {
        const result = (deliveries && deliveries.length > 0) ? deliveries[0] : null;
        return { delivery: result };
      }), catchError((err) => {
        console.log('delivery error', err.message);
        return of({ delivery: null });
      }));

    const orderObservable = from(rp(SERVICES_CONNECT_OPTIONS.order(`orders/${req.params.id}`)))
      .pipe(map(order => { return { order }; }),
        catchError((err) => {
          console.log('order error', err.message);
          return of({ order: null });
        }));

    forkJoin(ticketObservable, billObservable, deliveryObservable, orderObservable)
      .subscribe(val => {
        const result = val.reduce((acc, item) => {
          return {
            ...acc,
            ...item
          };
        });
        res.json(result);
      });
  } catch (error) {
    next(error);
  }
});

export default router;
