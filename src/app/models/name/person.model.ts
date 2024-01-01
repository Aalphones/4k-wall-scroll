import { Name } from './base.model';
import { Gender } from './gender.model';

export interface Person extends Name {
  profession: string;
  race: string;
  eye: string;
  hair: string;
  gender: Gender;
  birtplace: string;
  birthday: string;
  nationality: string;
  height: number;
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
