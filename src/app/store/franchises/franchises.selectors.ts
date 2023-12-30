import { createFeature } from '@ngrx/store';
import { franchisesReducer } from './franchises.reducer';

const franchisesFeature = createFeature({
  name: 'franchises',
  reducer: franchisesReducer,
});

export const franchisesSelectors = {
  ...franchisesFeature,
};
