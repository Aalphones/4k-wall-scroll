import { Franchise } from '../franchise.model';

export interface FranchisesState {
  data: FranchisesMap;
  dataLoading: boolean;
  pending: number;
}

export type FranchisesMap = Record<number, Franchise>;
