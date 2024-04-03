import { Figure, Franchise, Person } from '@app/models';
import { createSelector } from '@ngrx/store';
import { figuresSelectors } from './figures';
import { franchisesSelectors } from './franchises';
import { personsSelectors } from './persons';

const list = createSelector(
  personsSelectors.list,
  franchisesSelectors.list,
  figuresSelectors.list,
  (persons: Person[], franchises: Franchise[], figures: Figure[]) => {
    return [...persons, ...franchises, ...figures];
  }
);

const loading = createSelector(
  personsSelectors.isLoading,
  franchisesSelectors.isLoading,
  figuresSelectors.isLoading,
  (
    personLoading: boolean,
    franchiseLoading: boolean,
    figureLoading: boolean
  ) => {
    return personLoading || franchiseLoading || figureLoading;
  }
);

export const appSelectors = {
  list,
  loading,
};
