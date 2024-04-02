import { Person, PersonsMap } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const personsActions = createActionGroup({
  source: 'Person',
  events: {
    'Get List': emptyProps(),
    'Get List Success': props<{
      data: PersonsMap;
    }>(),
    'Get List Failure': emptyProps(),

    Update: props<{
      data: Person;
    }>(),
    'Update Success': emptyProps(),
    'Update Failure': emptyProps(),
  },
});
