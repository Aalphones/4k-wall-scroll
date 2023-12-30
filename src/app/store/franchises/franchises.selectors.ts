import { FranchisesMap } from '@app/models';
import { createFeature, createSelector } from '@ngrx/store';
import { franchisesReducer } from './franchises.reducer';

const franchisesFeature = createFeature({
  name: 'franchises',
  reducer: franchisesReducer,
});

const selectFranchiseDetail = (id: number) =>
  createSelector(franchisesFeature.selectData, (state: FranchisesMap) => {
    if (state[id]) {
      return state[id];
    } else {
      return null;
    }
  });

const selectFranchiseList = createSelector(
  franchisesFeature.selectData,
  (state: FranchisesMap) => {
    return Object.values(state);
  }
);

export const franchisesSelectors = {
  ...franchisesFeature,
  selectFranchiseList,
  selectFranchiseDetail,
};
