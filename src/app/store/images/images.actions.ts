import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StableImage } from '../../models/stable-image.model';

export const imagesActions = createActionGroup({
  source: 'Images',
  events: {
    'Save Images': props<{
      images: StableImage[];
    }>(),
    'Add Image': props<{
      image: StableImage;
    }>(),

    'Get Images': emptyProps(),
    'Set Images': props<{
      images: StableImage[];
    }>(),

    'Delete Image': props<{
      id: number;
    }>(),
    'Update Image': props<{
      image: StableImage;
    }>(),
    'Update Image Success': props<{
      image: StableImage;
    }>(),
    'Update Image Failure': emptyProps(),
  },
});
