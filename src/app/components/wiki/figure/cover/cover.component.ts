import { Component, Input } from '@angular/core';
import { Figure } from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-figure-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent {
  @Input() set data(figure: Figure | null) {
    if (figure) {
      this.title = figure.title;
      this.image = `${environment.mediaUrl}/figure/${figure.id}.jpg`;
      this.logo = `${environment.mediaUrl}/franchise/logo/${figure.franchise.id}.png`;
    }
  }

  image = `${environment.mediaUrl}/person/unknown.jpg`;
  logo = `${environment.mediaUrl}/flags/preview/unknown.jpg`;
  title = '';

  constructor() {}
}
