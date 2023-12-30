import { ImagesMap, StableImage } from '@app/models';
import { createFeature, createSelector } from '@ngrx/store';
import { imagesReducer } from './images.reducer';

const imageFeature = createFeature({
  name: 'images',
  reducer: imagesReducer,
});

const selectAvailableTags = createSelector(
  imageFeature.selectData,
  (state: ImagesMap) => {
    const tags: string[] = [];

    for (const image of Object.values(state)) {
      tags.push(...image.tags);
    }

    return [...new Set(tags)];
  }
);

const selectImageList = createSelector(
  imageFeature.selectData,
  (state: ImagesMap) => {
    return Object.values(state);
  }
);

const selectLatestUpdate = createSelector(
  selectImageList,
  (images: StableImage[]) => {
    let toRet;

    for (const img of images) {
      if (!toRet || img.updatedAt > toRet) {
        toRet = img.updatedAt;
      }
    }

    return toRet ? new Date(toRet) : null;
  }
);

export const imagesSelectors = {
  ...imageFeature,
  selectAvailableTags,
  selectImageList,
  selectLatestUpdate,
};
