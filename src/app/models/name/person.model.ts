import { Name } from './base.model';
import { FigureInfo } from './figure.model';
import { Gender } from './gender.model';
import { Nationality } from './nationality.model';

export interface Person extends Name {
  profession: string;
  eye: string;
  hair: string;
  gender: Gender;
  birthplace: string;
  birthday: string;
  death: string | null;
  nationality: Nationality;
  height: number;
  figures: FigureInfo[];
}

export interface PersonInfo {
  id: number;
  figureId: number;
  title: string;
  description: string;
}

export function isPerson(toCheck: unknown): toCheck is Person {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['birthplace', 'birthday'].every(
    (prop: string) => keys.includes(prop)
  );

  return hasRequiredProperties;
}
