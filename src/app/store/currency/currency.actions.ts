import { createAction, props } from '@ngrx/store';
import { Currency } from '../../types.dt';

export const loadCurrency = createAction('[Currency] Load');

export const loadCurrencySuccess = createAction(
  '[Currency] Load success',
  props<{ response: Currency[] }>()
);

export const loadCurrencyFail = createAction(
  '[Currency] Load fail',
  props<{ error: any }>()
);
