import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ApiService } from '../../services/api/api.service';
import * as CurrencyActions from './currency.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Currency } from '../../types.dt';

@Injectable()
export class CurrencyEffect {
  constructor(
    private actions$: Actions<Action<string>>,
    private apiService: ApiService
  ) {}

  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Action>(CurrencyActions.loadCurrency),
      exhaustMap(() =>
        this.apiService.getData('../../../data/currency.json').pipe(
          map<Currency[], any>((response: Currency[]) =>
            CurrencyActions.loadCurrencySuccess({ response })
          ),
          catchError((error: any) =>
            of(CurrencyActions.loadCurrencyFail({ error }))
          )
        )
      )
    )
  );
}
