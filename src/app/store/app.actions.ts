import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Link } from '../models/link.model';
import { PersonFigureUpdate } from '../models/name/base.model';

export const appActions = createActionGroup({
  source: 'App',
  events: {
    'Update Person Figure': props<{
      figureId: number;
      personId: number;
      description: string;
    }>(),
    'Update Person Figure Success': props<{
      figureId: number;
      personId: number;
      updates: PersonFigureUpdate[];
    }>(),
    'Update Person Figure Failure': emptyProps(),

    'Delete Person Figure': props<{
      figureId: number;
      personId: number;
    }>(),
    'Delete Person Figure Success': props<{
      figureId: number;
      personId: number;
    }>(),
    'Delete Person Figure Failure': emptyProps(),

    'Update Link': props<{
      data: Link;
    }>(),
    'Update Link Success': props<{
      data: Link;
    }>(),
    'Update Link Failure': emptyProps(),

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
