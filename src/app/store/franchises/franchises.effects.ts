import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Franchise, FranchisesMap } from '@app/models';
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

  constructor(private actions$: Actions, private http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return franchisesActions.getList();
  }

  private fetchList$(): Observable<Franchise[]> {
    return this.http.get<Franchise[]>(`${environment.baseUrl}/franchise/`);
  }

  private mapList(data: Franchise[]): FranchisesMap {
    const toRet: FranchisesMap = {};

    for (const item of data) {
      toRet[item.id] = item;
    }

    return toRet;
  }
}
