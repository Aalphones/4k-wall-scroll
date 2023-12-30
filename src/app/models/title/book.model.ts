import { Title } from './base.model';

export interface Book extends Title {
  published: Date;
  publisher: string;
  chapter: string;
}

export function isBook(toCheck: unknown): toCheck is Book {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['chapter', 'publisher'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
