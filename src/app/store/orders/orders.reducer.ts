import { createReducer, createSelector, on } from '@ngrx/store';
import { Order } from '../../types.dt';
import * as OrdersAction from './orders.actions';

export interface OrdersState {
  entities: Order[];
  loading: boolean;
  error: any;
}

const initialState: OrdersState = {
  entities: [],
  loading: false,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersAction.loadOrders, (state) => ({
    ...state,
    entities: [],
    loading: true,
    error: null,
  })),
  on(OrdersAction.loadOrdersSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    entities: response,
  })),
  on(OrdersAction.loadOrdersFail, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export const selectOrders: (state: any) => any = (state: any) => state.orders;

export const ordersSelector = createSelector(
  selectOrders,
  (orders: OrdersState) => orders
);
