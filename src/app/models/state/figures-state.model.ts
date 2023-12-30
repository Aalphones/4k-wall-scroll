import { Figure } from '../name';

export interface FiguresState {
  data: FiguresMap;
  pending: number;
}

export type FiguresMap = Record<number, Figure>;
