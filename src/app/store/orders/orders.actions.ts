import { createAction, props } from '@ngrx/store';
import { Order } from '../../types.dt';

export const loadOrders = createAction('[Orders] Load');

export const loadOrdersSuccess = createAction(
  '[Orders] Load success',
  props<{ response: Order[] }>()
);

export const loadOrdersFail = createAction(
  '[Orders] Load fail',
  props<{ error: any }>()
);
