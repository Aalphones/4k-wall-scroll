import { Nationality, Person, PersonsMap, PersonUpdate } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const personsActions = createActionGroup({
  source: 'Person',
  events: {
    'Get List': emptyProps(),
    'Get List Success': props<{
      data: PersonsMap;
    }>(),
    'Get List Failure': emptyProps(),

    'Get Nationalities': emptyProps(),
    'Get Nationalities Success': props<{
      data: Nationality[];
    }>(),
    'Get Nationalities Failure': emptyProps(),

    INIT: emptyProps(),
    Update: props<{
      data: PersonUpdate;
    }>(),
    'Update Success': props<{
      response: Person;
    }>(),
    'Update Failure': emptyProps(),
  },
});
