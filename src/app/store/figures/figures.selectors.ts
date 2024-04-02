import { FiguresMap } from '@app/models';
import { createFeature, createSelector } from '@ngrx/store';
import { figuresReducer } from './figures.reducer';

const figuresFeature = createFeature({
  name: 'figures',
  reducer: figuresReducer,
});

const detail = (id: number) =>
  createSelector(figuresFeature.selectData, (state: FiguresMap) => {
    if (state[id]) {
      return state[id];
    } else {
      return null;
    }
  });

const list = createSelector(figuresFeature.selectData, (state: FiguresMap) => {
  return Object.values(state);
});

const isLoading = createSelector(
  figuresFeature.selectPending,
  (pending: number) => {
    return pending > 0;
  }
);

export const figuresSelectors = {
  ...figuresFeature,
  detail,
  list,
  isLoading,
};
