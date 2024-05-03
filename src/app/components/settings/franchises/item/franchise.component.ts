import { Component, Input } from '@angular/core';
import { Franchise } from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrl: './franchise.component.scss',
})
export class FranchiseComponent {
  @Input() set data(data: Franchise) {
    this.logo = `${environment.mediaUrl}/franchise/logo/${data.id}.png`;
    this.name = data.title;
  }

  logo = `${environment.mediaUrl}/franchise/preview/unknown.jpg`;
  name = 'Unbekannt';
}
