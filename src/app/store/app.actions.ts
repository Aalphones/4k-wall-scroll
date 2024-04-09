import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Link } from '../models/link.model';

export const appActions = createActionGroup({
  source: 'App',
  events: {
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
