import { Component } from '@angular/core';
import { FranchiseUpdate, NationalityUpdate } from '@app/models';
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

  onUpdateFranchise(updated: FranchiseUpdate): void {
    this.facade.updateFranchise(updated);
  }

  onUpdateNationality(updated: NationalityUpdate): void {
    this.facade.updateNationality(updated);
  }
}
