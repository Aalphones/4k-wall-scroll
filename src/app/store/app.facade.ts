import { Injectable } from '@angular/core';
import {
  Figure,
  FigureUpdate,
  Franchise,
  FranchiseUpdate,
  ImagesMap,
  ImagesState,
  Link,
  Nationality,
  NationalityUpdate,
  Person,
  PersonUpdate,
  RollItem,
  StableImage,
} from '@app/models';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { appActions } from './app.actions';
import { appSelectors } from './app.selectors';
import { figuresActions, figuresSelectors } from './figures';
import { franchisesActions, franchisesSelectors } from './franchises';
import { imagesActions } from './images/images.actions';
import { imagesSelectors } from './images/images.selectors';
import { personsActions, personsSelectors } from './persons';

@Injectable({
  providedIn: 'root',
})
export class AppStateFacade {
  data$: Observable<RollItem[]> = this.store$.select(appSelectors.list);

  figures$: Observable<Figure[]> = this.store$.select(figuresSelectors.list);
  figuresLinks$: Observable<Link[]> = this.store$.select(
    figuresSelectors.selectLinks
  );
  figuresLinksLoading$: Observable<boolean> = this.store$.select(
    figuresSelectors.selectLinksPending
  );
  figuresLoading$: Observable<boolean> = this.store$.select(
    figuresSelectors.isLoading
  );

  franchises$: Observable<Franchise[]> = this.store$.select(
    franchisesSelectors.list
  );
  franchiseLinks$: Observable<Link[]> = this.store$.select(
    franchisesSelectors.selectLinks
  );
  franchiseLinksLoading$: Observable<boolean> = this.store$.select(
    franchisesSelectors.selectLinksPending
  );
  franchisesLoading$: Observable<boolean> = this.store$.select(
    franchisesSelectors.isLoading
  );

  isLoading$: Observable<boolean> = this.store$.select(appSelectors.loading);
  images$: Observable<StableImage[]> = this.store$.select(
    imagesSelectors.selectImageList
  );

  nationalities$: Observable<Nationality[]> = this.store$.select(
    personsSelectors.selectNationalities
  );

  persons$: Observable<Person[]> = this.store$.select(personsSelectors.list);
  personsLinks$: Observable<Link[]> = this.store$.select(
    personsSelectors.selectLinks
  );
  personsLinksLoading$: Observable<boolean> = this.store$.select(
    personsSelectors.selectLinksPending
  );
  personsLoading$: Observable<boolean> = this.store$.select(
    personsSelectors.isLoading
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

  deletePersonFigure(figureId: number, personId: number): void {
    this.store$.dispatch(appActions.deletePersonFigure({ figureId, personId }));
  }

  getFiguresDetail$(id: number): Observable<Figure | null> {
    return this.store$.select(figuresSelectors.detail(id));
  }

  getFigureLinks(figureId: number): void {
    this.store$.dispatch(figuresActions.getLinks({ figureId }));
  }

  getFiguresList(): void {
    this.store$.dispatch(figuresActions.getList());
  }

  getFranchiseLinks(franchiseId: number): void {
    this.store$.dispatch(franchisesActions.getLinks({ franchiseId }));
  }

  getFranchiseDetail$(id: number): Observable<Franchise | null> {
    return this.store$.select(franchisesSelectors.detail(id));
  }

  getFranchiseList(): void {
    this.store$.dispatch(franchisesActions.getList());
  }

  getImageDetail$(id: number): Observable<StableImage> {
    return this.store$
      .select(imagesSelectors.selectData)
      .pipe(map((imagesMap: ImagesMap) => imagesMap[id]));
  }

  getPersonsDetail$(id: number): Observable<Person | null> {
    return this.store$.select(personsSelectors.detail(id));
  }

  getPersonsLinks(personId: number): void {
    this.store$.dispatch(personsActions.getLinks({ personId }));
  }

  getPersonList(): void {
    this.store$.dispatch(personsActions.getList());
  }

  update(image: StableImage): void {
    this.store$.dispatch(imagesActions.updateImage({ image }));
  }

  updateFigure(data: FigureUpdate): void {
    this.store$.dispatch(figuresActions.update({ data }));
  }

  updateFranchise(data: FranchiseUpdate): void {
    this.store$.dispatch(franchisesActions.update({ data }));
  }

  updateLink(data: Link): void {
    this.store$.dispatch(appActions.updateLink({ data }));
  }

  updateNationality(data: NationalityUpdate): void {
    this.store$.dispatch(personsActions.updateNationality({ data }));
  }

  updatePerson(data: PersonUpdate): void {
    this.store$.dispatch(personsActions.update({ data }));
  }

  updatePersonFigure(
    figureId: number,
    personId: number,
    description: string
  ): void {
    this.store$.dispatch(
      appActions.updatePersonFigure({ figureId, personId, description })
    );
  }
}
