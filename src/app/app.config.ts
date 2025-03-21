import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpLoaderFactory } from './translate.config';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { currencyReducer } from './store/currency/currency.reducer';
import {
  createMetaReducers,
  hydrateState,
} from './store/local-storage-sync.reduce';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { provideEffects } from '@ngrx/effects';
import { CurrencyEffect } from './store/currency/currency.effect';
import { ApiService } from './services/api/api.service';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { ordersReducer } from './store/orders/orders.reducer';
import { OrdersEffect } from './store/orders/orders.effect';
import { langReducer } from './store/lang/lang.reducer';
import { selectedCurrencyReducer } from './store/selectedCurrency/selectedCurrency.reducer';
import { usersReducer } from './store/users/users.reducer';
import { authReducer } from './store/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    ApiService,
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideStore(
      {
        currency: currencyReducer,
        orders: ordersReducer,
        lang: langReducer,
        selectedCurrency: selectedCurrencyReducer,
        users: usersReducer,
        auth: authReducer,
      },
      {
        metaReducers: createMetaReducers(new LocalStorageService()),
        initialState: hydrateState(new LocalStorageService()),
      }
    ),
    provideEffects(CurrencyEffect, OrdersEffect),
  ],
};
