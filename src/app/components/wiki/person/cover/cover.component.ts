import { Component, Input } from '@angular/core';
import { Person } from '@app/models';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-person-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss',
})
export class CoverComponent {
  @Input() set data(person: Person) {
    this.title = person.title;
    this.image = `${environment.mediaUrl}/person/${person.id}.jpg`;
    this.flag = `${environment.mediaUrl}/flags/preview/${person.nationality.id}.jpg`;
    this.profession = person.profession;
  }

  flag = `${environment.mediaUrl}/flags/preview/unknown.jpg`;
  image = `${environment.mediaUrl}/person/unknown.jpg`;
  nationality = 'Unbekannt';
  profession = 'Unbekannte Tätigkeit';
  title = '';

  constructor() {}
}
