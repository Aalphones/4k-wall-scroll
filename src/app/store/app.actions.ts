import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { StableImage } from '../models/stable-image.model';

export const appActions = createActionGroup({
  source: 'App',
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

    'Show Notification': props<{
      message: string;
      icon?: IconProp;
    }>(),
    'Show Error': props<{
      message: string;
      icon?: IconProp;
    }>(),
  },
});
