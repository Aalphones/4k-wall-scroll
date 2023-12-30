import { Component, Input } from '@angular/core';
import { isFranchise } from '@app/models';
import { environment } from 'src/environments/environment.prod';
import { RollItem } from '../roll/roll-item.model';

@Component({
  selector: 'app-wiki-preview',
  templateUrl: './wiki-preview.component.html',
  styleUrls: ['./wiki-preview.component.scss'],
})
export class WikiPreviewComponent {
  @Input() set data(item: RollItem) {
    if (isFranchise(item)) {
      this.preview = `${environment.mediaUrl}/franchise/${item.id}.jpg`;
      this.routerLink = ['franchise', item.id.toString()];
      this.title = item.title;
    }
  }

  preview = '';
  routerLink: string[] = [];
  title = '';

  constructor() {}
}
