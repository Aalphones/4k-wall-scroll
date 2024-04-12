import { getRandomId } from '@app/utils';
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
  firstSeenYear: number | null;
  persons: PersonInfo[];
}

export interface FigureInfo {
  figureId: number;
  title: string;
  description: string;
}

export function isFigureInfo(toCheck: unknown): toCheck is FigureInfo {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }
  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['figureId', 'title', 'description'].every(
    (prop: string) => keys.includes(prop)
  );

  return hasRequiredProperties;
}

export interface FigureUpdate extends Omit<Figure, 'franchise'> {
  franchise: number | null;
  preview?: string;
  image?: string;
}

export function getEmptyFigure(): FigureUpdate {
  return {
    id: getRandomId(),
    title: '',
    type: '',
    eye: '',
    hair: '',
    updatedAt: new Date(),
    description: '',
    gender: Gender.various,
    franchise: null,
    firstSeen: '',
    firstSeenYear: null,
    persons: [],
  };
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
