import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FigureInfo,
  isFigureInfo,
  isFranchise,
  isPerson,
  isPersonInfo,
  PersonInfo,
  RollItem,
} from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-wiki-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wiki-preview.component.html',
  styleUrls: ['./wiki-preview.component.scss'],
})
export class WikiPreviewComponent {
  @Input() set data(item: RollItem | FigureInfo | PersonInfo) {
    const prefix = this.getPrefix(item);
    const id = this.getId(item);

    this.preview = `${environment.mediaUrl}/${prefix}/preview/${id}.jpg`;
    this.routerLink = [prefix, id];
    this.title = this.getTitle(item);
  }

  preview = '';
  routerLink: string[] = [];
  title = '';

  constructor() {}

  private getId(item: RollItem | FigureInfo | PersonInfo): string {
    if (isPersonInfo(item)) {
      return item.personId.toString();
    } else if (isFigureInfo(item)) {
      return item.figureId.toString();
    } else {
      return item.id.toString();
    }
  }

  private getPrefix(item: RollItem | FigureInfo | PersonInfo): string {
    if (isFranchise(item)) {
      return '/franchise';
    } else if (isPerson(item) || isPersonInfo(item)) {
      return '/person';
    } else {
      return '/figure';
    }
  }

  private getTitle(item: RollItem | FigureInfo | PersonInfo): string {
    if (isPersonInfo(item) || isFigureInfo(item)) {
      return `${item.title} (${item.description})`;
    } else {
      return item.title;
    }
  }
}
