import { Franchise } from '../franchise.model';

export interface FranchisesState {
  data: FranchisesMap;
  pending: number;
}

export type FranchisesMap = Record<number, Franchise>;
