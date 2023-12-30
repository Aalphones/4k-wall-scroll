import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
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

  constructor(private actions$: Actions, private http: HttpClient) {}
}
