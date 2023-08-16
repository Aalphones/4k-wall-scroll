import { SortingDirection } from '@app/models';

export interface FilterOption<T> {
  value: T;
  label: string;
}

export interface Filter<T = any> {
  searchText: string;
  sort: SortingDirection;
  tags: string[];
  option?: T | null;
}

export const emptyFilter: Filter = {
  searchText: '',
  sort: SortingDirection.ASC,
  tags: [],
  option: null,
};
