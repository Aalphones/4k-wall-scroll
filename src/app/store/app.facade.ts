import { Injectable } from '@angular/core';
import { ImagesMap, ImagesState, StableImage } from '@app/models';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { franchisesActions } from './franchises';
import { imagesActions } from './images/images.actions';
import { imagesSelectors } from './images/images.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppStateFacade {
  images$: Observable<StableImage[]> = this.store$.select(
    imagesSelectors.selectImageList
  );

  tags$: Observable<string[]> = this.store$.select(
    imagesSelectors.selectAvailableTags
  );

  constructor(private store$: Store<ImagesState>) {}

  add(image: StableImage): void {
    this.store$.dispatch(imagesActions.addImage({ image }));
  }

  delete(image: StableImage): void {
    this.store$.dispatch(imagesActions.deleteImage({ id: image.id }));
  }

  getFranchiseList(): void {
    this.store$.dispatch(franchisesActions.getList());
  }

  getImageDetail$(id: number): Observable<StableImage> {
    return this.store$
      .select(imagesSelectors.selectData)
      .pipe(map((imagesMap: ImagesMap) => imagesMap[id]));
  }

  update(image: StableImage): void {
    this.store$.dispatch(imagesActions.updateImage({ image }));
  }
}
