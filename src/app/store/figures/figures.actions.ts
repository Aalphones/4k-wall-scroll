import { Figure, FiguresMap, FigureUpdate } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const figuresActions = createActionGroup({
  source: 'Figures',
  events: {
    'Get List': emptyProps(),
    'Get List Success': props<{
      data: FiguresMap;
    }>(),
    'Get List Failure': emptyProps(),

    Update: props<{
      data: FigureUpdate;
    }>(),
    'Update Success': props<{
      response: Figure;
    }>(),
    'Update Failure': emptyProps(),
  },
});
