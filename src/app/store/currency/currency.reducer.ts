import { createReducer, createSelector, on } from '@ngrx/store';
import { Currency } from '../../types.dt';
import * as CurrencyAction from './currency.actions';

export interface CurrencyState {
  currencies: Currency[];
  loading: boolean;
  error: any;
}

const initialState: CurrencyState = {
  currencies: [],
  loading: false,
  error: null,
};

export const currencyReducer = createReducer(
  initialState,
  on(CurrencyAction.loadCurrency, (state) => ({
    ...state,
    currencies: [],
    loading: true,
    error: null,
  })),
  on(CurrencyAction.loadCurrencySuccess, (state, { response }) => ({
    ...state,
    loading: false,
    currencies: response,
  })),
  on(CurrencyAction.loadCurrencyFail, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export const selectCurrency: (state: any) => any = (state: any) =>
  state.currency;

export const currencySelector = createSelector(
  selectCurrency,
  (currency: CurrencyState) => currency
);
