import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderCardComponent } from '../order-card/order-card.component';
import { Currency, Order } from '../../types.dt';
import { Action, Store } from '@ngrx/store';
import { ordersSelector, OrdersState } from '../../store/orders/orders.reducer';
import {
  selectedCurrencySelector,
  SelectedCurrencyState,
} from '../../store/selectedCurrency/selectedCurrency.reducer';
import { skipWhile, Subscription } from 'rxjs';
import * as OrdersActions from '../../store/orders/orders.actions';

@Component({
  selector: 'app-order-detail',
  imports: [OrderCardComponent, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public order: Order | null = null;
  public currency: Currency | null = null;
  private subscription: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<OrdersState>,
    private readonly storeSelectedCurrency: Store<SelectedCurrencyState>
  ) {}

  ngOnInit(): void {
    const orderId: string = this.route.snapshot.paramMap.get('id') || '0';
    console.log('orderId: ', orderId);

    if (orderId) {
      this.store.dispatch<Action>(OrdersActions.loadOrders());
      const subscription: Subscription = this.store
        .select<OrdersState>(ordersSelector)
        .pipe(skipWhile((response: OrdersState) => response.loading))
        .subscribe((response: OrdersState) => {
          if (!response.error) {
            const orders: Order[] = response.entities;
            const orderIndex: number = orders.findIndex(
              (o: Order) => o.id === Number(orderId)
            );
            if (orderIndex !== -1) {
              this.order = orders[orderIndex];
            }
          }
        });

      this.subscription.push(subscription);

      const subscription1: Subscription = this.storeSelectedCurrency
        .select(selectedCurrencySelector)
        .subscribe((selectedCurrency: Currency) => {
          console.log(selectedCurrency);
          this.currency = selectedCurrency;
        });

      this.subscription.push(subscription1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.map((s: Subscription) => s.unsubscribe());
  }
}
