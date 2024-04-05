import { Directive } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { sortData } from '@app/utils';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { Filter, SortingDirection } from '../components/ui/filter';

@Directive()
export abstract class BaseRollDirective<T> {
  abstract data$: Observable<T[]>;

  filter$!: Observable<Filter>;
  page$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(12);

  filteredData$!: Observable<T[]>;
  itemCount$!: Observable<number>;
  pagedData$!: Observable<T[]>;

  protected baseRoute = '';

  constructor(protected router: Router, protected route: ActivatedRoute) {}

  abstract filterByText(prompt: T[], text: string): T[];

  initPaging(baseRoute: string): void {
    this.baseRoute = baseRoute;
    this.filter$ = this.route.queryParams.pipe(
      map((params: Params) => this.mapRouteParams(params)),
      shareReplay()
    );
    this.filteredData$ = combineLatest([this.data$, this.filter$]).pipe(
      map(([data, filter]) => {
        const byText: T[] = this.filterByText(data, filter.searchText);

        return sortData(byText, 'updatedAt', filter.sort, true);
      })
    );

    this.itemCount$ = this.filteredData$.pipe(
      map((prompts: T[]) => prompts.length)
    );
    this.pagedData$ = combineLatest([
      this.filteredData$,
      this.page$,
      this.pageSize$,
    ]).pipe(
      map(([sets, page, pageSize]: [T[], number, number]) => {
        if (pageSize === 0) {
          return sets;
        }

        return this.filterByPage(sets, page, pageSize);
      }),
      shareReplay()
    );
  }

  onUpdateFilter(filter: Partial<Filter>): void {
    this.router.navigate([this.baseRoute], { queryParams: filter });
  }

  switchPage(next: number): void {
    this.page$.next(next);
    const element = document.querySelector('#filterBar');
    element?.scrollIntoView();
  }

  switchPageSize(pageSize: number): void {
    this.pageSize$.next(pageSize);
    this.page$.next(0);
    const element = document.querySelector('#filterBar');
    element?.scrollIntoView();
  }

  private filterByPage(sets: T[], page: number, pageSize: number): T[] {
    const firstIndex = page * pageSize;
    const lastIndex = firstIndex + pageSize;

    return sets.slice(firstIndex, lastIndex);
  }

  private mapRouteParams(params: Params): Filter {
    const searchText = params['searchText'] ?? '';
    const sort = params['sort'] ?? SortingDirection.DESC;

    return {
      searchText,
      sort,
    };
  }
}
