import { createFeature } from '@ngrx/store';
import { figuresReducer } from './figures.reducer';

const figuresFeature = createFeature({
  name: 'figures',
  reducer: figuresReducer,
});

export const figuresSelectors = {
  ...figuresFeature,
};
