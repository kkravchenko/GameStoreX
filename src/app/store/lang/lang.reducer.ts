import {
  Action,
  ActionReducer,
  createReducer,
  createSelector,
  MemoizedSelector,
  on,
  Selector,
} from '@ngrx/store';
import { SET } from './lang.actions';

export interface LangState {
  lang: number;
}

const initialState: number = 0;

export const langReducer: ActionReducer<number, Action<string>> = createReducer(
  initialState,
  on(SET, (state, { id }) => id)
);

export const selectLang: Selector<LangState, number> = (state: LangState) =>
  state.lang;

export const langSelector: MemoizedSelector<
  LangState,
  number,
  (s1: number) => number
> = createSelector(selectLang, (lang: number) => lang);
