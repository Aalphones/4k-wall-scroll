import { getRandomId } from '@app/utils';
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

export interface PersonUpdate extends Omit<Person, 'nationality'> {
  nationality: number | null;
  preview?: string;
  image?: string;
}

export function getEmptyPerson(): PersonUpdate {
  return {
    id: getRandomId(),
    title: '',
    updatedAt: new Date(),
    description: '',
    profession: '',
    eye: '',
    hair: '',
    gender: Gender.various,
    birthplace: '',
    birthday: '',
    death: null,
    nationality: null,
    height: 0,
    figures: [],
  };
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
