import { FranchisesMap } from '@app/models';
import { createFeature, createSelector } from '@ngrx/store';
import { franchisesReducer } from './franchises.reducer';

const franchisesFeature = createFeature({
  name: 'franchises',
  reducer: franchisesReducer,
});

const detail = (id: number) =>
  createSelector(franchisesFeature.selectData, (state: FranchisesMap) => {
    if (state[id]) {
      return state[id];
    } else {
      return null;
    }
  });

const list = createSelector(
  franchisesFeature.selectData,
  (state: FranchisesMap) => {
    return Object.values(state);
  }
);

const isLoading = createSelector(
  franchisesFeature.selectPending,
  (pending: number) => {
    return pending > 0;
  }
);

export const franchisesSelectors = {
  ...franchisesFeature,
  list,
  detail,
  isLoading,
};
