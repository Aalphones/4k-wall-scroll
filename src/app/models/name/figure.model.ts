import { Name } from './base.model';
import { Gender } from './gender.model';

export interface Figure extends Name {
  type: string;
  eye: string;
  hair: string;
  gender: Gender;
}
