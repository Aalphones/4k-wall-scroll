export interface Nationality {
  id: number;
  name: string;
}

export interface NationalityUpdate extends Nationality {
  image?: string;
  preview?: string;
}
