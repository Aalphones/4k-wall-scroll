import { createReducer, on } from '@ngrx/store';
import { AppState, ImagesMap } from '../models/app-state.model';
import { appActions } from './app.actions';

export const INITIAL_STATE: AppState = {
  data: {},
  pending: 0,
};

export const imageReducer = createReducer(
  INITIAL_STATE,

  // Data Handling
  on(
    appActions.addImage,
    appActions.updateImage,
    (state: AppState, { image }) => {
      const data: ImagesMap = {
        ...state.data,
        [image.id]: image,
      };
      const pending = state.pending + 1;

      return {
        ...state,
        data,
        pending,
      };
    }
  ),
  on(appActions.updateImageSuccess, (state: AppState, { image }) => {
    const data: ImagesMap = {
      ...state.data,
      [image.id]: image,
    };

    return {
      ...state,
      pending: state.pending - 1,
      data,
    };
  }),
  on(appActions.updateImageFailure, (state: AppState) => {
    return {
      ...state,
      pending: state.pending - 1,
    };
  }),
  on(appActions.setImages, (state: AppState, { images }) => {
    const data: ImagesMap = {
      ...state.data,
    };

    for (const image of images) {
      data[image.id] = image;
    }

    return {
      ...state,
      data,
    };
  }),
  on(appActions.deleteImage, (state: AppState, { id }) => {
    const updatedData: ImagesMap = { ...state.data };
    delete updatedData[id];

    return {
      ...state,
      data: updatedData,
    };
  })
);
