import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SortingDirection, StableImage } from '@app/models';
import { AppStateFacade } from '@app/store';
import { sortData } from '@app/utils';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { Filter } from './filter';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss'],
})
export class RollComponent {
  data$: Observable<StableImage[]> = this.facade.data$;

  filter$: Observable<Filter<number>> = this.route.queryParams.pipe(
    map((params: Params) => this.mapRouteParams(params)),
    shareReplay()
  );
  filteredData$: Observable<StableImage[]> = combineLatest([
    this.data$,
    this.filter$,
  ]).pipe(
    map(([images, filter]: [StableImage[], Filter]) => {
      const byTags: StableImage[] = this.filterByTags(images, filter.tags);
      const byText: StableImage[] = this.filterByText(
        byTags,
        filter.searchText
      );

      return sortData(byText, 'createdAt', filter.sort, true);
    })
  );

  page$: Observable<number> = this.route.queryParams.pipe(
    map((params: Params) => {
      if (params['page']) {
        return Number(params['page']);
      } else {
        return 0;
      }
    })
  );
  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(18);

  itemCount$: Observable<number> = this.data$.pipe(
    map((images: StableImage[]) => images.length)
  );
  pagedData$: Observable<StableImage[]> = combineLatest([
    this.filteredData$,
    this.page$,
    this.pageSize$,
  ]).pipe(
    map(([images, page, pageSize]: [StableImage[], number, number]) => {
      if (pageSize === 0) {
        return images;
      }

      return this.filterByPage(images, page, pageSize);
    }),
    shareReplay()
  );

  tags$: Observable<string[]> = this.facade.tags$;

  private baseRoute = '';

  constructor(
    private facade: AppStateFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onUpdateFilter(filter: Partial<Filter<number>>): void {
    this.router.navigate([''], { queryParams: filter });
  }

  switchPage(page: number): void {
    this.router.navigate([this.baseRoute], { queryParams: { page } });
  }

  private filterByPage(
    images: StableImage[],
    page: number,
    pageSize: number
  ): StableImage[] {
    const firstIndex = page * pageSize;
    const lastIndex = firstIndex + pageSize;

    return images.slice(firstIndex, lastIndex);
  }

  private filterByTags(images: StableImage[], tags: string[]): StableImage[] {
    const noTagSelected: boolean = tags.length === 0;
    if (noTagSelected) {
      return images;
    }

    return images.filter((item: StableImage) => {
      return tags.every((tag: string) => item.tags.includes(tag));
    });
  }

  private filterByText(images: StableImage[], text: string): StableImage[] {
    if (!text) {
      return images;
    }

    return images.filter((item: StableImage) => {
      const containsStringInName: boolean = item.name.includes(text);
      const containsStringInTags: boolean = item.tags.some((tag: string) =>
        tag.includes(text)
      );

      return containsStringInName || containsStringInTags;
    });
  }

  private mapRouteParams(params: Params): Filter<number> {
    const tags: string[] = [];
    if (typeof params['tags'] === 'string') {
      tags.push(...params['tags'].split(','));
    } else if (Array.isArray(params['tags'])) {
      tags.push(...params['tags']);
    }

    let option = null;
    if (
      typeof params['option'] === 'string' &&
      !isNaN(Number(params['option']))
    ) {
      option = Number(params['option']);
    }

    const searchText = params['searchText'] ?? '';
    const sort = params['sort'] ?? SortingDirection.ASC;

    return {
      tags,
      option,
      searchText,
      sort,
    };
  }
}
