import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders.component').then(
        (m) => m.OrdersComponent
      ),
    data: { animation: 'OrdersPage' },
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent
      ),
    data: { animation: 'OrderPage' },
  },
];
