import { Link } from '../link.model';
import { Nationality, Person } from '../name';

export interface PersonsState {
  data: PersonsMap;
  nationalities: Nationality[];
  pending: number;

  links: Link[];
  linksPending: boolean;
}

export type PersonsMap = Record<number, Person>;
