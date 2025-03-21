import {
  Action,
  ActionReducer,
  createReducer,
  DefaultProjectorFn,
  MemoizedSelector,
  on,
} from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../types.dt';

export interface AuthState {
  auth: User | null;
}

export const initialState: AuthState = {
  auth: null,
};

export const authReducer: ActionReducer<
  AuthState,
  Action<string>
> = createReducer(
  initialState,
  on(AuthActions.addAuthUser, (state, { user }) => ({
    ...state,
    auth: user,
  })),
  on(AuthActions.delAuthUser, (state) => ({
    ...state,
    auth: null,
  }))
);

export const selectAuthState: MemoizedSelector<
  object,
  AuthState,
  DefaultProjectorFn<AuthState>
> = createFeatureSelector<AuthState>('auth');

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.auth
);
