import { FiguresState } from '@app/models';
import { createReducer } from '@ngrx/store';

export const INITIAL_FIGURES_STATE: FiguresState = {
  data: {},
  pending: 0,
};

export const figuresReducer = createReducer(INITIAL_FIGURES_STATE);
