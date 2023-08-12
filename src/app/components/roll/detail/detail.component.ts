import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StableImage } from '@app/models';
import { AppStateFacade } from '@app/store';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  id$: Observable<number> = this.route.params.pipe(
    map((params: Params) => {
      if (params['id']) {
        return Number(params['id']);
      } else {
        return 0;
      }
    })
  );
  tags$: Observable<string[]> = this.facade.tags$;

  data$: Observable<StableImage> = this.id$.pipe(
    switchMap((id: number) => this.facade.getImageDetail$(id))
  );

  constructor(private facade: AppStateFacade, private route: ActivatedRoute) {}
}
