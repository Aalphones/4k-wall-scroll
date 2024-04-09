import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Figure, FiguresMap, FigureUpdate, Link } from '@app/models';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { figuresActions } from './figures.actions';

@Injectable()
export class FiguresEffects implements OnInitEffects {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(figuresActions.getList),
      switchMap(() => {
        return this.fetchList$().pipe(
          map((response: Figure[]) => {
            return figuresActions.getListSuccess({
              data: this.mapList(response),
            });
          }),
          catchError(() => {
            return of(figuresActions.getListFailure());
          })
        );
      })
    )
  );

  getLinkList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(figuresActions.getLinks),
      switchMap(({ figureId }) => {
        return this.fetchLinks$(figureId).pipe(
          map((links: Link[]) => {
            return figuresActions.getLinksSuccess({
              links,
            });
          }),
          catchError(() => {
            return of(figuresActions.getLinksFailure());
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(figuresActions.update),
      switchMap(({ data }) => {
        return this.postUpdateFigure$(data).pipe(
          map((response: Figure) => {
            return figuresActions.updateSuccess({
              response,
            });
          }),
          catchError(() => {
            return of(figuresActions.updateFailure());
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  ngrxOnInitEffects(): Action {
    return figuresActions.getList();
  }

  private fetchLinks$(figureId: number): Observable<Link[]> {
    return this.http.get<Link[]>(`${environment.baseUrl}/link/`, {
      params: { figureId },
    });
  }

  private fetchList$(): Observable<Figure[]> {
    return this.http.get<Figure[]>(`${environment.baseUrl}/figure/`);
  }

  private postUpdateFigure$(request: FigureUpdate): Observable<Figure> {
    return this.http.post<Figure>(
      `${environment.baseUrl}/figure/update.php`,
      request
    );
  }

  private mapList(data: Figure[]): FiguresMap {
    const toRet: FiguresMap = {};

    for (const item of data) {
      toRet[item.id] = item;
    }

    return toRet;
  }
}
