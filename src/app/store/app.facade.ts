import { Injectable } from '@angular/core';
import {
  Figure,
  Franchise,
  ImagesMap,
  ImagesState,
  StableImage,
} from '@app/models';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { figuresActions, figuresSelectors } from './figures';
import { franchisesActions, franchisesSelectors } from './franchises';
import { imagesActions } from './images/images.actions';
import { imagesSelectors } from './images/images.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppStateFacade {
  figures$: Observable<Figure[]> = this.store$.select(figuresSelectors.list);
  figuresLoading$: Observable<boolean> = this.store$.select(
    figuresSelectors.isLoading
  );

  franchises$: Observable<Franchise[]> = this.store$.select(
    franchisesSelectors.list
  );
  franchisesLoading$: Observable<boolean> = this.store$.select(
    franchisesSelectors.isLoading
  );

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

  getFiguresDetail$(id: number): Observable<Figure | null> {
    return this.store$.select(figuresSelectors.detail(id));
  }

  getFranchiseDetail$(id: number): Observable<Franchise | null> {
    return this.store$.select(franchisesSelectors.detail(id));
  }

  getFiguresList(): void {
    this.store$.dispatch(figuresActions.getList());
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

  updateFranchise(data: Franchise): void {
    this.store$.dispatch(franchisesActions.update({ data }));
  }
}
