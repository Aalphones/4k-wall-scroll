export interface Franchise {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
  parentId: number | null;
}
