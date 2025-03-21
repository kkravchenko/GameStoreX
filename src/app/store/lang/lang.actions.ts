import { createAction, props } from '@ngrx/store';

export const SET = createAction('[Lang] Set', props<{ id: number }>());
