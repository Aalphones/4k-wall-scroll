import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Link } from '../models/link.model';
import { appActions } from './app.actions';
import { franchisesActions } from './franchises';

@Injectable()
export class AppEffects {
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

  constructor(private actions$: Actions, private http: HttpClient) {}

  private postUpdateLink$(request: Link): Observable<void> {
    return this.http.post<void>(
      `${environment.baseUrl}/link/update.php`,
      request
    );
  }
}
