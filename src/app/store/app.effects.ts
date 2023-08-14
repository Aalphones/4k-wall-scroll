import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, Observable, of, switchMap } from 'rxjs';
import { AppState } from '../models/app-state.model';
import { StableImage } from '../models/stable-image.model';
import { appActions } from './app.actions';
import { appSelectors } from './app.selectors';

@Injectable()
export class AppEffects {
  readonly imageDatabaseKey = '4k-wall-scroll';
  readonly imageObjectKey = 'stable-images';

  onSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.saveImages),
      switchMap(({ images }) => {
        return images.map((image: StableImage) =>
          appActions.addImage({ image })
        );
      })
    )
  );

  onFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.getImages),
      concatLatestFrom(() => [
        this.store$.select(appSelectors.selectLatestUpdate),
      ]),
      switchMap(([, updatedAt]) => {
        return this.fetchImages$(updatedAt).pipe(
          map((images: StableImage[]) => {
            this.storeAll(images, this.imageObjectKey);

            return appActions.setImages({
              images,
            });
          }),
          catchError(() => {
            return of(
              appActions.showError({
                message: 'Beim Laden vom Server ist ein Fehler aufgetreten',
                icon: faWarning,
              })
            );
          })
        );
      })
    )
  );

  onDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.deleteImage),
      concatMap(({ id }) => {
        return this.deleteSynced$(id).pipe(
          map(() => {
            this.delete(id, this.imageObjectKey);

            return appActions.showNotification({
              message: 'Bild wurde erfolgreich gelöscht',
              icon: faCheckCircle,
            });
          }),
          catchError(() => {
            return of(
              appActions.showError({
                message: 'Beim Löschen des Bildes ist ein Fehler aufgetreten',
                icon: faWarning,
              })
            );
          })
        );
      })
    )
  );

  onUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.updateImage, appActions.addImage),
      concatMap(({ image }) => {
        this.store(image, this.imageObjectKey);

        return of(appActions.updateImageSuccess({ image }));
        return this.saveImage$(image).pipe(
          map((response: StableImage) => {
            const updatedImage: StableImage = {
              ...image,
              ...response,
            };
            this.store(updatedImage, this.imageObjectKey);

            return appActions.updateImageSuccess({ image: updatedImage });
          }),
          catchError(() => {
            return of(appActions.updateImageFailure());
          })
        );
      })
    )
  );

  private database!: IDBDatabase;

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private http: HttpClient
  ) {
    this.initDatabase();
  }

  private delete(id: number, key: string): void {
    const transaction: IDBTransaction = this.database.transaction(
      key,
      'readwrite'
    );
    const store = transaction.objectStore(key);
    store.delete(id);
  }

  private deleteSynced$(id: number): Observable<void> {
    const formData: any = new FormData();
    formData.append('id', id);

    return this.http.post<void>('./assets/scripts/delete-prompt.php', formData);
  }

  private fetchImages$(updatedAt: Date | null): Observable<StableImage[]> {
    let params = new HttpParams();

    if (updatedAt) {
      params = params.set(
        'updatedAt',
        updatedAt.toISOString().slice(0, 19).replace('T', ' ')
      );
    }

    return this.http.get<StableImage[]>('./assets/scripts/get-images.php', {
      params,
    });
  }

  private getAll(key: string): IDBRequest {
    const transaction: IDBTransaction = this.database.transaction(
      key,
      'readonly'
    );
    const store: IDBObjectStore = transaction.objectStore(key);

    return store.getAll();
  }

  private getFormData(image: StableImage): FormData {
    const formData: any = new FormData();

    formData.append('id', image.id.toString());
    formData.append('data', image.data);
    formData.append('thumbnail', image.thumbnail);
    formData.append('name', image.name);
    formData.append('createdAt', image.createdAt.toISOString());
    formData.append('updatedAt', image.updatedAt.toISOString());
    formData.append('width', image.width.toString());
    formData.append('height', image.height.toString());
    formData.append('tags', image.tags.join(','));
    formData.append('positivePrompt', image.positivePrompt);
    formData.append('negativePrompt', image.negativePrompt);
    formData.append('steps', image.steps.toString());
    formData.append('sampler', image.sampler);
    formData.append('cfg', image.cfg.toString());
    formData.append('seed', image.seed.toString());
    formData.append('model', image.model);

    return formData;
  }

  private initDatabase(): void {
    const request = indexedDB.open(this.imageDatabaseKey);

    request.onupgradeneeded = () => {
      this.database = request.result;

      this.database.createObjectStore(this.imageObjectKey, {
        keyPath: 'id',
      });
    };

    request.onsuccess = () => {
      this.database = request.result;

      this.retrieveImages();
    };
  }

  private retrieveImages(): void {
    const request = this.getAll(this.imageObjectKey);

    request.onsuccess = () => {
      const images: StableImage[] = request.result;

      this.store$.dispatch(appActions.setImages({ images }));
      this.store$.dispatch(appActions.getImages());
    };
  }

  private saveImage$(updatedImage: StableImage): Observable<StableImage> {
    return this.http.post<StableImage>(
      './assets/scripts/save-image.php',
      this.getFormData(updatedImage)
    );
  }

  private store(item: unknown, key: string): void {
    const transaction: IDBTransaction = this.database.transaction(
      key,
      'readwrite'
    );
    const store = transaction.objectStore(key);
    store.put(item);
  }

  private storeAll(items: unknown[], key: string) {
    for (const item of items) {
      this.store(item, key);
    }
  }
}
