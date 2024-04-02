import { Component, Input } from '@angular/core';
import { isFranchise, isPerson, RollItem } from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-wiki-preview',
  templateUrl: './wiki-preview.component.html',
  styleUrls: ['./wiki-preview.component.scss'],
})
export class WikiPreviewComponent {
  @Input() set data(item: RollItem) {
    const prefix = this.getPrefix(item);

    this.preview = `${environment.mediaUrl}/${prefix}/preview/${item.id}.jpg`;
    this.routerLink = [prefix, item.id.toString()];
    this.title = item.title;
  }

  preview = '';
  routerLink: string[] = [];
  title = '';

  constructor() {}

  private getPrefix(item: RollItem): string {
    if (isFranchise(item)) {
      return 'franchise';
    } else if (isPerson(item)) {
      return 'person';
    } else {
      return 'figure';
    }
  }
}
