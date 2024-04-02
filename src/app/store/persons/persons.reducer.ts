import { PersonsState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { personsActions } from './persons.actions';

export const INITIAL_PERSONS_STATE: PersonsState = {
  data: {},
  pending: 0,
};

export const personsReducer = createReducer(
  INITIAL_PERSONS_STATE,
  on(personsActions.getList, (state: PersonsState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
      data: {},
    };
  }),
  on(personsActions.getListSuccess, (state: PersonsState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),
  on(personsActions.getListFailure, (state: PersonsState) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
    };
  })
);
