export interface Franchise {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
  parentId: number | null;
}

export interface FranchiseInfo {
  id: number;
  title: string;
}

export function isFranchise(toCheck: unknown): toCheck is Franchise {
  if (typeof toCheck !== 'object' || toCheck === null) {
    return false;
  }

  const keys = Object.keys(toCheck);

  // Check if all required properties exist
  const hasRequiredProperties = ['parentId', 'title'].every((prop: string) =>
    keys.includes(prop)
  );

  return hasRequiredProperties;
}
