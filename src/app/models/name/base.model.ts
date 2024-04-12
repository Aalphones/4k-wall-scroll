export interface Name {
  id: number;
  updatedAt: Date;
  title: string;
  description: string;
}

export interface PersonFigureUpdate {
  figureId: number;
  personId: number;
  figure_title: string;
  person_title: string;
  description: string;
}
