import { Nationality, Person } from '../name';

export interface PersonsState {
  data: PersonsMap;
  nationalities: Nationality[];
  pending: number;
}

export type PersonsMap = Record<number, Person>;
