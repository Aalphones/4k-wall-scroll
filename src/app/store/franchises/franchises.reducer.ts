import { FranchisesState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { franchisesActions } from './franchises.actions';

export const INITIAL_FRANCHISES_STATE: FranchisesState = {
  data: {},
  pending: 0,
};

export const franchisesReducer = createReducer(
  INITIAL_FRANCHISES_STATE,
  on(franchisesActions.getList, (state: FranchisesState) => {
    const pending = state.pending + 1;

    return {
      ...state,
      pending,
    };
  }),
  on(franchisesActions.getListSuccess, (state: FranchisesState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),
  on(franchisesActions.getListFailure, (state: FranchisesState) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
    };
  })
);
