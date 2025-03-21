import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { OrdersState, selectOrders } from './orders.reducer';
import { ApiService } from '../../services/api/api.service';
import * as OrdersActions from './orders.actions';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { Order } from '../../types.dt';

@Injectable()
export class OrdersEffect {
  constructor(
    private actions$: Actions<Action<string>>,
    private store: Store<OrdersState>,
    private apiService: ApiService
  ) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Action>(OrdersActions.loadOrders),
      withLatestFrom<any, any>(this.store.select(selectOrders)),
      exhaustMap(() => {
        return this.apiService.getData('../../../data/orders.json').pipe(
          map<Order[], any>((response: Order[]) =>
            OrdersActions.loadOrdersSuccess({ response })
          ),
          catchError((error: any) =>
            of(OrdersActions.loadOrdersFail({ error }))
          )
        );
      })
    )
  );
}
