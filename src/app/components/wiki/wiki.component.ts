import { Component } from '@angular/core';
import { AppStateFacade } from '@app/store';
import { map, Observable } from 'rxjs';
import { RollItem } from './roll/roll-item.model';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent {
  data$: Observable<RollItem[]> = this.facade.franchises$.pipe(
    map((franchises) => {
      return franchises;
    })
  );

  constructor(private facade: AppStateFacade) {}
}
