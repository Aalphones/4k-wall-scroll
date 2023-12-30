import { ImagesMap, ImagesState } from '@app/models';
import { createReducer, on } from '@ngrx/store';
import { imagesActions } from './images.actions';

export const INITIAL_IMAGES_STATE: ImagesState = {
  data: {},
  pending: 0,
};

export const imagesReducer = createReducer(
  INITIAL_IMAGES_STATE,

  // Data Handling
  on(
    imagesActions.addImage,
    imagesActions.updateImage,
    (state: ImagesState) => {
      const pending = state.pending + 1;

      return {
        ...state,
        pending,
      };
    }
  ),
  on(imagesActions.updateImageSuccess, (state: ImagesState, { image }) => {
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
  on(imagesActions.updateImageFailure, (state: ImagesState) => {
    return {
      ...state,
      pending: state.pending - 1,
    };
  }),
  on(imagesActions.setImages, (state: ImagesState, { images }) => {
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
  on(imagesActions.deleteImage, (state: ImagesState, { id }) => {
    const updatedData: ImagesMap = { ...state.data };
    delete updatedData[id];

    return {
      ...state,
      data: updatedData,
    };
  })
);
