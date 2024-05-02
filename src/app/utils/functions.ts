import { SortingDirection } from '../models/sorting.model';

export function getRandomId(): number {
  return Math.floor(Math.random() * Date.now());
}

export function getExtensionFromName(name: string): string {
  const acceptedExtensions = ['.original.jpg', '.jpg', '.png', '.jpeg'];

  for (const extension of acceptedExtensions) {
    if (name.endsWith(extension)) {
      return extension;
    }
  }

  return '.jpg';
}

export function sortData(
  data: any[],
  sortBy: string | null | undefined,
  sortDir: SortingDirection = SortingDirection.ASC,
  forDate: boolean = false
): any[] {
  if (!sortBy || !data || !sortDir) {
    return data;
  }

  let sorted;
  if (forDate) {
    const mappedData = data.map((item) => {
      return { ...item, [sortBy]: new Date(item[sortBy]) };
    });
    sorted = mappedData.sort((a, b) => compare(a, b, sortBy));
  } else {
    sorted = [...data].sort((a, b) => compare(a, b, sortBy));
  }

  if (sortDir === SortingDirection.DESC) {
    return sorted.reverse();
  } else {
    return sorted;
  }
}

/**
 * Any is needed to prevent Error
 * https://stackoverflow.com/questions/56568423/typescript-no-index-signature-with-a-parameter-of-type-string-was-found-on-ty
 */
function compare(a: any, b: any, sortBy: string): number {
  if (!a.hasOwnProperty(sortBy) || !b.hasOwnProperty(sortBy)) {
    return -1;
  }

  if (a[sortBy] > b[sortBy]) {
    return 1;
  } else if (a[sortBy] < b[sortBy]) {
    return -1;
  } else {
    return 0;
  }
}
