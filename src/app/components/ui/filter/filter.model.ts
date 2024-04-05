export enum SortingDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Filter<T = any> {
  searchText: string;
  sort: SortingDirection;
}

export const emptyFilter: Filter = {
  searchText: '',
  sort: SortingDirection.ASC,
};
