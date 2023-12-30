import { StableImage } from '../stable-image.model';

export interface ImagesState {
  data: ImagesMap;
  pending: number;
}

export type ImagesMap = Record<number, StableImage>;
