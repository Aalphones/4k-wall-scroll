import { Title } from './base.model';

export interface Series extends Title {
  seasons: number;
  episodes: number;
  start: Date;
  end: Date;
}

export function isSeries(toCheck: unknown): toCheck is Series {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['seasons', 'episodes'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
