import { Name } from './base.model';
import { Gender } from './gender.model';

export interface Figure extends Name {
  type: string;
  eye: string;
  hair: string;
  gender: Gender;
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
