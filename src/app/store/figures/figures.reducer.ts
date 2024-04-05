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

  on(figuresActions.update, (state: FiguresState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
    };
  }),
  on(figuresActions.updateSuccess, (state: FiguresState, { response }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data: {
        ...state.data,
        [response.id]: response,
      },
    };
  }),

  on(
    figuresActions.getListFailure,
    figuresActions.updateFailure,
    (state: FiguresState) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
      };
    }
  )
);
