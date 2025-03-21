import { Component, OnDestroy, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { ordersSelector, OrdersState } from '../../store/orders/orders.reducer';
import * as OrdersActions from '../../store/orders/orders.actions';
import { skipWhile, Subscription } from 'rxjs';
import { Currency, Order } from '../../types.dt';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { OrderCardComponent } from '../order-card/order-card.component';
import {
  selectedCurrencySelector,
  SelectedCurrencyState,
} from '../../store/selectedCurrency/selectedCurrency.reducer';

@Component({
  selector: 'app-orders',
  imports: [TranslatePipe, RouterModule, OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  public currency: Currency | null = null;
  private subscription: Subscription[] = [];

  constructor(
    private readonly store: Store<OrdersState>,
    private readonly storeSelectedCurrency: Store<SelectedCurrencyState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch<Action>(OrdersActions.loadOrders());
    const subscription: Subscription = this.store
      .select<OrdersState>(ordersSelector)
      .pipe(skipWhile((response: OrdersState) => response.loading))
      .subscribe((response: OrdersState) => {
        if (!response.error) {
          this.orders = response.entities;
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

  ngOnDestroy(): void {
    this.subscription.map((s: Subscription) => s.unsubscribe());
  }
}
