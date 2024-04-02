import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person, PersonsMap } from '@app/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { personsActions } from './persons.actions';

@Injectable()
export class PersonsEffects implements OnInitEffects {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.getList),
      switchMap(() => {
        return this.fetchList$().pipe(
          map((response: Person[]) => {
            return personsActions.getListSuccess({
              data: this.mapList(response),
            });
          }),
          catchError(() => {
            return of(personsActions.getListFailure());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return personsActions.getList();
  }

  private fetchList$(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.baseUrl}/person/`);
  }

  private mapList(data: Person[]): PersonsMap {
    const toRet: PersonsMap = {};

    for (const item of data) {
      toRet[item.id] = item;
    }

    return toRet;
  }
}
