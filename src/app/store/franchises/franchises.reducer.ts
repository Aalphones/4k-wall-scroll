import { FranchisesState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { appActions } from '../app.actions';
import { franchisesActions } from './franchises.actions';

export const INITIAL_FRANCHISES_STATE: FranchisesState = {
  data: {},
  pending: 0,

  links: [],
  linksPending: false,
};

export const franchisesReducer = createReducer(
  INITIAL_FRANCHISES_STATE,
  on(
    franchisesActions.getList,
    franchisesActions.update,
    (state: FranchisesState) => {
      const pending = state.pending + 1;

      return {
        ...state,
        pending,
      };
    }
  ),
  on(franchisesActions.getListSuccess, (state: FranchisesState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),
  on(franchisesActions.updateSuccess, (state: FranchisesState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data: {
        [data.id]: data,
      },
    };
  }),
  on(
    franchisesActions.getListFailure,
    franchisesActions.updateFailure,
    (state: FranchisesState) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
      };
    }
  ),

  on(
    franchisesActions.getLinks,
    appActions.updateLink,
    (state: FranchisesState) => {
      return {
        ...state,
        linksPending: true,
      };
    }
  ),
  on(franchisesActions.getLinksSuccess, (state: FranchisesState, { links }) => {
    return {
      ...state,
      linksPending: false,
      links,
    };
  }),
  on(appActions.updateLinkSuccess, (state: FranchisesState, { data }) => {
    const links = [...state.links];
    const index = links.findIndex((current) => current.id === data.id);

    if (index) {
      links[index] = data;

      return {
        ...state,
        linksPending: false,
        links,
      };
    } else {
      return {
        ...state,
        linksPending: false,
      };
    }
  }),
  on(
    franchisesActions.getLinksFailure,
    appActions.updateLinkFailure,
    (state: FranchisesState) => {
      return {
        ...state,
        linksPending: false,
      };
    }
  )
);
