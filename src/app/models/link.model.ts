import { getRandomId } from '../utils/functions';

export interface Link {
  id: number;
  updatedAt: Date;
  name: string;
  url: string;
  type: LinkType;

  personId?: number;
  figureId?: number;
  franchiseId?: number;
}

export enum LinkType {
  Instagram = 'insta',
  Wikipedia = 'wiki',
  Gallerie = 'gallery',
  Homepage = 'home',
  Sonstiges = 'other',
}

export function getEmptyLink(): Link {
  return {
    id: getRandomId(),
    updatedAt: new Date(),
    name: '',
    url: '',
    type: LinkType.Sonstiges,
  };
}

export function isLink(toCheck: unknown): toCheck is Link {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['name', 'url', 'type'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
