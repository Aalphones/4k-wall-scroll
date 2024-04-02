import { PersonsMap } from '@app/models';
import { createFeature, createSelector } from '@ngrx/store';
import { personsReducer } from './persons.reducer';

const personsFeature = createFeature({
  name: 'persons',
  reducer: personsReducer,
});

const detail = (id: number) =>
  createSelector(personsFeature.selectData, (state: PersonsMap) => {
    if (state[id]) {
      return state[id];
    } else {
      return null;
    }
  });

const list = createSelector(personsFeature.selectData, (state: PersonsMap) => {
  return Object.values(state);
});

const isLoading = createSelector(
  personsFeature.selectPending,
  (pending: number) => {
    return pending > 0;
  }
);

export const personsSelectores = {
  ...personsFeature,
  detail,
  list,
  isLoading,
};
