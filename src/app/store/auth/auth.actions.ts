import { createAction, props } from '@ngrx/store';
import { User } from '../../types.dt';

export const addAuthUser = createAction(
  '[User] Add Auth User',
  props<{ user: User }>()
);

export const delAuthUser = createAction('[User] Del Auth User');
