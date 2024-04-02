import { Component } from '@angular/core';
import { RollItem } from '@app/models';
import { AppStateFacade } from '@app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent {
  data$: Observable<RollItem[]> = this.facade.data$;

  constructor(private facade: AppStateFacade) {}
}
