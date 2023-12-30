import { Title } from './base.model';

export interface Series extends Title {
  seasons: number;
  episodes: number;
  start: Date;
  end: Date;
}
