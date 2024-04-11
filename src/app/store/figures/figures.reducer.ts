import { FiguresState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { appActions } from '../app.actions';
import { figuresActions } from './figures.actions';

export const INITIAL_FIGURES_STATE: FiguresState = {
  data: {},
  pending: 0,

  links: [],
  linksPending: false,
};

export const figuresReducer = createReducer(
  INITIAL_FIGURES_STATE,
  on(figuresActions.getList, (state: FiguresState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
      data: {},
    };
  }),
  on(figuresActions.getListSuccess, (state: FiguresState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),

  on(figuresActions.update, (state: FiguresState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
    };
  }),
  on(figuresActions.updateSuccess, (state: FiguresState, { response }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data: {
        ...state.data,
        [response.id]: response,
      },
    };
  }),

  on(
    figuresActions.getListFailure,
    figuresActions.updateFailure,
    (state: FiguresState) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
      };
    }
  ),

  on(figuresActions.getLinks, appActions.updateLink, (state: FiguresState) => {
    return {
      ...state,
      linksPending: true,
    };
  }),
  on(figuresActions.getLinksSuccess, (state: FiguresState, { links }) => {
    return {
      ...state,
      linksPending: false,
      links,
    };
  }),
  on(appActions.updateLinkSuccess, (state: FiguresState, { data }) => {
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
    figuresActions.getLinksFailure,
    appActions.updateLinkFailure,
    (state: FiguresState) => {
      return {
        ...state,
        linksPending: false,
      };
    }
  )
);
