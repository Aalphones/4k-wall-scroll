import { Franchise, FranchisesMap, Link } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const franchisesActions = createActionGroup({
  source: 'Franchises',
  events: {
    'Get List': emptyProps(),
    'Get List Success': props<{
      data: FranchisesMap;
    }>(),
    'Get List Failure': emptyProps(),

    'Get Links': props<{
      franchiseId: number;
    }>(),
    'Get Links Success': props<{
      links: Link[];
    }>(),
    'Get Links Failure': emptyProps(),

    Update: props<{
      data: Franchise;
    }>(),
    'Update Success': props<{
      data: Franchise;
    }>(),
    'Update Failure': emptyProps(),
  },
});
