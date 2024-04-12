import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Link } from '../models/link.model';
import { PersonFigureUpdate } from '../models/name/base.model';
import { appActions } from './app.actions';
import { franchisesActions } from './franchises';

@Injectable()
export class AppEffects {
  deletePersonFigure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.deletePersonFigure),
      switchMap(({ figureId, personId }) => {
        return this.deletePersonFigureRequest$(figureId, personId).pipe(
          map(() => {
            return appActions.deletePersonFigureSuccess({
              figureId,
              personId,
            });
          }),
          catchError(() => {
            return of(appActions.deletePersonFigureFailure());
          })
        );
      })
    )
  );

  throwError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(franchisesActions.getListFailure),
      map(() =>
        appActions.showError({
          message: 'Beim Laden vom Server ist ein Fehler aufgetreten',
          icon: faWarning,
        })
      )
    )
  );

  updateLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.updateLink),
      switchMap(({ data }) => {
        return this.postUpdateLink$(data).pipe(
          map(() => {
            return appActions.updateLinkSuccess({ data });
          }),
          catchError(() => {
            return of(appActions.updateLinkFailure());
          })
        );
      })
    )
  );

  updatePersonFigure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.updatePersonFigure),
      switchMap(({ figureId, personId, description }) => {
        return this.postUpdatePersonFigure$(
          figureId,
          personId,
          description
        ).pipe(
          map((updates: PersonFigureUpdate[]) => {
            return appActions.updatePersonFigureSuccess({
              figureId,
              personId,
              updates,
            });
          }),
          catchError(() => {
            return of(appActions.updatePersonFigureFailure());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  private deletePersonFigureRequest$(
    figureId: number,
    personId: number
  ): Observable<void> {
    const params = new HttpParams();
    params.append('figureId', figureId);
    params.append('personId', personId);

    return this.http.delete<void>(
      `${environment.baseUrl}/figure/person-delete.php`,
      { params }
    );
  }

  private postUpdatePersonFigure$(
    figureId: number,
    personId: number,
    description: string
  ): Observable<PersonFigureUpdate[]> {
    return this.http.post<PersonFigureUpdate[]>(
      `${environment.baseUrl}/figure/person.php`,
      {
        figureId,
        personId,
        description,
      }
    );
  }

  private postUpdateLink$(request: Link): Observable<void> {
    return this.http.post<void>(
      `${environment.baseUrl}/link/update.php`,
      request
    );
  }
}
