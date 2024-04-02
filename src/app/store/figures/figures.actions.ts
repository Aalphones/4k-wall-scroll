import { Figure, FiguresMap } from '@app/models';
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
      data: Figure;
    }>(),
    'Update Success': emptyProps(),
    'Update Failure': emptyProps(),
  },
});
