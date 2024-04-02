import { FiguresState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { figuresActions } from './figures.actions';

export const INITIAL_FIGURES_STATE: FiguresState = {
  data: {},
  pending: 0,
};

export const figuresReducer = createReducer(
  INITIAL_FIGURES_STATE,
  on(figuresActions.getList, (state: FiguresState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
      data: {},
    };
  }),
  on(figuresActions.getListSuccess, (state: FiguresState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),
  on(figuresActions.getListFailure, (state: FiguresState) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
    };
  })
);
