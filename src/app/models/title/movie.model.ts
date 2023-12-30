import { Title } from './base.model';

export interface Movie extends Title {
  length: number;
  fsk: number;
  published: Date;
  franchiseId: number;
}
