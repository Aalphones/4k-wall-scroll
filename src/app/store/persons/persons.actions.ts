import {
  Link,
  Nationality,
  NationalityUpdate,
  Person,
  PersonsMap,
  PersonUpdate,
} from '@app/models';
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

    'Update Nationality': props<{
      data: NationalityUpdate;
    }>(),
    'Update Nationality Success': props<{
      data: NationalityUpdate;
    }>(),
    'Update Nationality Failure': emptyProps(),

    INIT: emptyProps(),
    Update: props<{
      data: PersonUpdate;
    }>(),
    'Update Success': props<{
      response: Person;
    }>(),
    'Update Failure': emptyProps(),

    'Get Links': props<{
      personId: number;
    }>(),
    'Get Links Success': props<{
      links: Link[];
    }>(),
    'Get Links Failure': emptyProps(),
  },
});
