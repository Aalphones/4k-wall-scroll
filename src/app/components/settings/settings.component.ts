import { Component } from '@angular/core';
import { NationalityUpdate } from '@app/models';
import { AppStateFacade } from '@app/store';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  franchises$ = this.facade.franchises$;
  nationalities$ = this.facade.nationalities$;

  constructor(private facade: AppStateFacade) {}

  onUpdateNationality(updated: NationalityUpdate): void {
    this.facade.updateNationality(updated);
  }
}
