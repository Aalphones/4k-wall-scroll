import { Person } from '../name';

export interface PersonsState {
  data: PersonsMap;
  pending: number;
}

export type PersonsMap = Record<number, Person>;
