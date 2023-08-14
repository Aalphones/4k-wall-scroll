import { Injectable } from '@angular/core';
import { AppState, ImagesMap, StableImage } from '@app/models';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { appActions } from './app.actions';
import { appSelectors } from './app.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppStateFacade {
  data$: Observable<StableImage[]> = this.store$.select(
    appSelectors.selectImageList
  );

  tags$: Observable<string[]> = this.store$.select(
    appSelectors.selectAvailableTags
  );

  constructor(private store$: Store<AppState>) {}

  add(image: StableImage): void {
    this.store$.dispatch(appActions.addImage({ image }));
  }

  delete(image: StableImage): void {
    this.store$.dispatch(appActions.deleteImage({ id: image.id }));
  }

  getImageDetail$(id: number): Observable<StableImage> {
    return this.store$
      .select(appSelectors.selectData)
      .pipe(map((imagesMap: ImagesMap) => imagesMap[id]));
  }

  update(image: StableImage): void {
    this.store$.dispatch(appActions.updateImage({ image }));
  }
}
