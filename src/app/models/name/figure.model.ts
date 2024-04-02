import { FranchiseInfo } from '../franchise.model';
import { Name } from './base.model';
import { Gender } from './gender.model';
import { PersonInfo } from './person.model';

export interface Figure extends Name {
  type: string;
  eye: string;
  hair: string;
  gender: Gender;
  franchise: FranchiseInfo;
  firstSeen: string;
  firstSeenYear: number;
  persons: PersonInfo[];
}

export interface FigureInfo {
  id: number;
  personId: number;
  title: string;
  description: string;
}

export function isFigure(toCheck: unknown): toCheck is Figure {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['type', 'gender'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
