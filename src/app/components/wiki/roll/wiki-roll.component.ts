import { Component, Input } from '@angular/core';
import { RollItem } from './roll-item.model';

@Component({
  selector: 'app-wiki-roll',
  templateUrl: './wiki-roll.component.html',
  styleUrls: ['./wiki-roll.component.scss'],
})
export class WikiRollComponent {
  @Input() data: RollItem[] = [];
}
