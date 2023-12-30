import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Franchise } from '@app/models';
import { AppStateFacade } from '@app/store';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss'],
})
export class FranchiseComponent {
  data$: Observable<Franchise | null> = this.route.params.pipe(
    switchMap((params: Params) => {
      return this.facade.getFranchiseDetail$(params['id']);
    })
  );

  constructor(private facade: AppStateFacade, private route: ActivatedRoute) {}
}
