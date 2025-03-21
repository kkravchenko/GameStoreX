import {
  Action,
  ActionReducer,
  createReducer,
  createSelector,
  MemoizedSelector,
  on,
  Selector,
} from '@ngrx/store';
import { SET } from './selectedCurrency.action';
import { Currency } from '../../types.dt';

export interface SelectedCurrencyState {
  selectedCurrency: Currency;
}

const initialState: any = {};

export const selectedCurrencyReducer: ActionReducer<
  Currency,
  Action<string>
> = createReducer(
  initialState,
  on(SET, (state, { currency }) => currency)
);

export const selectSelectedCurrency: Selector<
  SelectedCurrencyState,
  Currency
> = (state: SelectedCurrencyState) => state.selectedCurrency;

export const selectedCurrencySelector = createSelector(
  selectSelectedCurrency,
  (selectedCurrency: Currency) => selectedCurrency
);
