import { Name } from './base.model';
import { Gender } from './gender.model';

export interface Person extends Name {
  profession: string;
  race: string;
  eye: string;
  hair: string;
  gender: Gender;
  birtplace: string;
  birthday: string;
  nationality: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hips: number;
}
