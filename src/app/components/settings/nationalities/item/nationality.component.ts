import { Component, Input } from '@angular/core';
import { Nationality } from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrl: './nationality.component.scss',
})
export class NationalityComponent {
  @Input() set data(data: Nationality) {
    this.flag = `${environment.mediaUrl}/flags/preview/${data.id}.jpg`;
    this.name = data.name;
  }

  flag = `${environment.mediaUrl}/flags/preview/unknown.jpg`;
  name = 'Unbekannt';
}
