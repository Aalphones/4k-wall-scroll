import { Title } from './base.model';

export interface Movie extends Title {
  length: number;
  fsk: number;
  published: Date;
  franchiseId: number;
}

export function isMovie(toCheck: unknown): toCheck is Movie {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['length', 'fsk'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
