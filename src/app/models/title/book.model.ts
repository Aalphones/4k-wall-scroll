import { Title } from './base.model';

export interface Book extends Title {
  published: Date;
  publisher: string;
  chapter: string;
}
