import { Figure } from './figure.model';

export interface Role {
  id: number;
  description: string;
  figure: Figure;
  updatedAt: Date;
}
