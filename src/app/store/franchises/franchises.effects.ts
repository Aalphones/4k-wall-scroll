import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Franchise, FranchisesMap, Link } from '@app/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { franchisesActions } from './franchises.actions';

@Injectable()
export class FranchisesEffects implements OnInitEffects {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(franchisesActions.getList),
      switchMap(() => {
        return this.fetchList$().pipe(
          map((response: Franchise[]) => {
            return franchisesActions.getListSuccess({
              data: this.mapList(response),
            });
          }),
          catchError(() => {
            return of(franchisesActions.getListFailure());
          })
        );
      })
    )
  );

  getLinkList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(franchisesActions.getLinks),
      switchMap(({ franchiseId }) => {
        return this.fetchLinks$(franchiseId).pipe(
          map((links: Link[]) => {
            return franchisesActions.getLinksSuccess({
              links,
            });
          }),
          catchError(() => {
            return of(franchisesActions.getLinksFailure());
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(franchisesActions.update),
      switchMap(({ data }) => {
        return this.postUpdateFranchise$(data).pipe(
          map(() => {
            return franchisesActions.updateSuccess({ data });
          }),
          catchError(() => {
            return of(franchisesActions.updateFailure());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return franchisesActions.getList();
  }

  private fetchLinks$(franchiseId: number): Observable<Link[]> {
    return this.http.get<Link[]>(`${environment.baseUrl}/link/`, {
      params: { franchiseId },
    });
  }

  private fetchList$(): Observable<Franchise[]> {
    return this.http.get<Franchise[]>(`${environment.baseUrl}/franchise/`);
  }

  private postUpdateFranchise$(request: Franchise): Observable<void> {
    return this.http.post<void>(
      `${environment.baseUrl}/franchise/update.php`,
      request
    );
  }

  private mapList(data: Franchise[]): FranchisesMap {
    const toRet: FranchisesMap = {};

    for (const item of data) {
      toRet[item.id] = item;
    }

    return toRet;
  }
}
