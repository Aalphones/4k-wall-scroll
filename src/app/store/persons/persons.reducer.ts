import { PersonsState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { personsActions } from './persons.actions';

export const INITIAL_PERSONS_STATE: PersonsState = {
  data: {},
  nationalities: [],
  pending: 0,
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

  on(personsActions.update, (state: PersonsState) => {
    const pending = state.pending + 1;
    return {
      ...state,
      pending,
    };
  }),
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
    (state: PersonsState) => {
      const pending = state.pending - 1;

      return {
        ...state,
        pending,
      };
    }
  )
);
