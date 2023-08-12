import { StableImage } from './stable-image.model';

export interface AppState {
  data: ImagesMap;
  pending: number;
}

export type ImagesMap = Record<number, StableImage>;
