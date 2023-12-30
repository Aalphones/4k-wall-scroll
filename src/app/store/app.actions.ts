import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { createActionGroup, props } from '@ngrx/store';

export const appActions = createActionGroup({
  source: 'App',
  events: {
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
