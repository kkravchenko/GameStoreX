import { createAction, props } from '@ngrx/store';
import { Currency } from '../../types.dt';

export const SET = createAction(
  '[SelectedCurrency] Set',
  props<{ currency: Currency }>()
);
