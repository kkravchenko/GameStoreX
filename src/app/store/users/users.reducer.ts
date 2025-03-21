import {
  Action,
  ActionReducer,
  createReducer,
  DefaultProjectorFn,
  MemoizedSelector,
  on,
} from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '../../types.dt';

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: [],
};

export const usersReducer: ActionReducer<
  UsersState,
  Action<string>
> = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  }))
);

export const selectUserState: MemoizedSelector<
  object,
  UsersState,
  DefaultProjectorFn<UsersState>
> = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UsersState) => state.users
);

export const selectUserById: (
  login: string
) => MemoizedSelector<object, User[], (s1: UsersState) => User[]> = (
  login: string
) =>
  createSelector(selectUserState, (state: UsersState) =>
    // fetch request to user exists
    state.users.filter((u: User) => u.login === login)
  );

export const selectUserAuth: (
  password: string
) => MemoizedSelector<object, User[], (s1: UsersState) => User[]> = (
  password: string
) =>
  createSelector(selectUserState, (state: UsersState) =>
    // fetch request to auth user
    state.users.filter((u: User) => u.password === password)
  );
