import { Franchise } from '../franchise.model';
import { Link } from '../link.model';

export interface FranchisesState {
  data: FranchisesMap;
  pending: number;

  links: Link[];
  linksPending: boolean;
}

export type FranchisesMap = Record<number, Franchise>;
