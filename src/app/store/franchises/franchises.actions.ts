import { Franchise, FranchisesMap } from '@app/models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const franchisesActions = createActionGroup({
  source: 'Franchises',
  events: {
    'Get List': emptyProps(),
    'Get List Success': props<{
      data: FranchisesMap;
    }>(),
    'Get List Failure': emptyProps(),

    Update: props<{
      data: Franchise;
    }>(),
    'Update Success': emptyProps(),
    'Update Failure': emptyProps(),
  },
});
