import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StableImage } from '@app/models';
import { AppStateFacade } from '@app/store';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
} from 'rxjs';

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss'],
})
export class RollComponent {
  data$: Observable<StableImage[]> = this.facade.data$;

  tagFilter$: Observable<string> = this.route.queryParams.pipe(
    map((params: Params) => params['tag'])
  );
  filteredData$: Observable<StableImage[]> = combineLatest([
    this.data$,
    this.tagFilter$,
  ]).pipe(
    map(([images, filterTag]: [StableImage[], string]) => {
      if (!filterTag) {
        return images;
      }

      return this.filterByTag(images, filterTag);
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
  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(10);

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

  private baseRoute = 'roll';

  constructor(
    private facade: AppStateFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  private filterByTag(images: StableImage[], filterTag: string): StableImage[] {
    return images.filter((image: StableImage) =>
      image.tags.includes(filterTag)
    );
  }
}
