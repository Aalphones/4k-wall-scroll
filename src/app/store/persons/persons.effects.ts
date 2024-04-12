import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Link,
  Nationality,
  Person,
  PersonsMap,
  PersonUpdate,
} from '@app/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { personsActions } from './persons.actions';

@Injectable()
export class PersonsEffects implements OnInitEffects {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.getList, personsActions.init),
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

  geNationalities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.getNationalities, personsActions.init),
      switchMap(() => {
        return this.fetchNationalities$().pipe(
          map((data: Nationality[]) => {
            return personsActions.getNationalitiesSuccess({
              data,
            });
          }),
          catchError(() => {
            return of(personsActions.getNationalitiesFailure());
          })
        );
      })
    )
  );

  getLinkList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.getLinks),
      switchMap(({ personId }) => {
        return this.fetchLinks$(personId).pipe(
          map((links: Link[]) => {
            return personsActions.getLinksSuccess({
              links,
            });
          }),
          catchError(() => {
            return of(personsActions.getLinksFailure());
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.update),
      switchMap(({ data }) => {
        return this.updatePerson$(data).pipe(
          map((response: Person) => {
            return personsActions.updateSuccess({
              response,
            });
          }),
          catchError(() => {
            return of(personsActions.updateFailure());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return personsActions.init();
  }

  private fetchLinks$(personId: number): Observable<Link[]> {
    return this.http.get<Link[]>(`${environment.baseUrl}/link/`, {
      params: { personId },
    });
  }

  private fetchList$(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.baseUrl}/person/`);
  }

  private fetchNationalities$(): Observable<Nationality[]> {
    return this.http.get<Nationality[]>(`${environment.baseUrl}/nationality/`);
  }

  private updatePerson$(request: PersonUpdate): Observable<Person> {
    return this.http.post<Person>(
      `${environment.baseUrl}/person/update.php`,
      request
    );
  }

  private mapList(data: Person[]): PersonsMap {
    const toRet: PersonsMap = {};

    for (const item of data) {
      toRet[item.id] = item;
    }

    return toRet;
  }
}
