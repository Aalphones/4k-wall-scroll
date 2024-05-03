import { Person, PersonsState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { appActions } from '../app.actions';
import { personsActions } from './persons.actions';

export const INITIAL_PERSONS_STATE: PersonsState = {
  data: {},
  nationalities: [],
  pending: 0,

  links: [],
  linksPending: false,
};

export const personsReducer = createReducer(
  INITIAL_PERSONS_STATE,
  on(personsActions.init, (state: PersonsState) => {
    const pending = state.pending + 2;
    return {
      ...state,
      pending,
    };
  }),

  on(personsActions.getList, (state: PersonsState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
      data: {},
    };
  }),
  on(personsActions.getListSuccess, (state: PersonsState, { data }) => {
    const pending = state.pending - 1;

    return {
      ...state,
      pending,
      data,
    };
  }),

  on(personsActions.getNationalities, (state: PersonsState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
      nationalities: [],
    };
  }),
  on(
    personsActions.getNationalitiesSuccess,
    (state: PersonsState, { data }) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
        nationalities: data,
      };
    }
  ),

  on(
    personsActions.update,
    personsActions.updateNationality,
    appActions.updatePersonFigure,
    (state: PersonsState) => {
      const pending = state.pending + 1;
      return {
        ...state,
        pending,
      };
    }
  ),
  on(
    appActions.updatePersonFigureSuccess,
    (state: PersonsState, { updates, personId }) => {
      const pending = state.pending - 1;
      const figures = updates.map(({ figureId, description, figure_title }) => {
        return { figureId, description, title: figure_title };
      });
      const updatedPerson: Person = {
        ...state.data[personId],
        figures,
      };
      return {
        ...state,
        pending,
        data: {
          ...state.data,
          [personId]: updatedPerson,
        },
      };
    }
  ),
  on(personsActions.updateSuccess, (state: PersonsState, { response }) => {
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
    personsActions.getNationalitiesFailure,
    personsActions.getListFailure,
    personsActions.updateFailure,
    personsActions.updateNationalityFailure,
    appActions.updatePersonFigureFailure,
    (state: PersonsState) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
      };
    }
  ),
  on(personsActions.getLinks, appActions.updateLink, (state: PersonsState) => {
    return {
      ...state,
      linksPending: true,
    };
  }),
  on(personsActions.getLinksSuccess, (state: PersonsState, { links }) => {
    return {
      ...state,
      linksPending: false,
      links,
    };
  }),
  on(appActions.updateLinkSuccess, (state: PersonsState, { data }) => {
    const links = [...state.links];
    const index = links.findIndex((current) => current.id === data.id);

    if (index !== -1) {
      links[index] = data;

      return {
        ...state,
        linksPending: false,
        links,
      };
    } else {
      links.push(data);

      return {
        ...state,
        links,
        linksPending: false,
      };
    }
  }),
  on(
    personsActions.getLinksFailure,
    appActions.updateLinkFailure,
    (state: PersonsState) => {
      return {
        ...state,
        linksPending: false,
      };
    }
  ),
  on(
    personsActions.updateNationalitySuccess,
    (state: PersonsState, { data }) => {
      const pending = state.pending - 1;
      const nationalities = [...state.nationalities];
      const index = state.nationalities.findIndex(
        (item) => item.id === data.id
      );

      if (index !== -1) {
        nationalities[index] = data;
      } else {
        nationalities.push(data);
      }

      return {
        ...state,
        pending,
        nationalities,
      };
    }
  )
);
