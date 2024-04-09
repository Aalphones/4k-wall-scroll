import { Link } from '../link.model';
import { Figure } from '../name';

export interface FiguresState {
  data: FiguresMap;
  pending: number;

  links: Link[];
  linksPending: boolean;
}

export type FiguresMap = Record<number, Figure>;
