import { getRandomId } from '../utils/functions';

interface BaseImage {
  id: number;
  data: string;
  original: string;
  thumbnail: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  width: number;
  height: number;
  tags: string[];
}

export interface StableImage extends BaseImage {
  positivePrompt: string;
  negativePrompt: string;
  steps: number;
  sampler: string;
  cfg: number;
  seed: number;
  model: string;
}

export function createEmptyStableImage(): StableImage {
  return {
    id: getRandomId(),
    name: '',
    data: '',
    original: '',
    thumbnail: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
    width: 0,
    height: 0,
    positivePrompt: '',
    negativePrompt: '',
    steps: 0,
    sampler: '',
    cfg: 0,
    seed: 0,
    model: '',
  };
}
