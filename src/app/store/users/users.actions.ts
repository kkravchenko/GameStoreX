import { createAction, props } from '@ngrx/store';
import { User } from '../../types.dt';

export const addUser = createAction('[User] Add User', props<{ user: User }>());
