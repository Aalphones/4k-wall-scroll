import { Franchise } from '../franchise.model';

export interface Title {
  id: number;
  title: number;
  updatedAt: Date;
  description: string;
  franchise: Franchise;
}
