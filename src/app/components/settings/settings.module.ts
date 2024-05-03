import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FranchisesComponent } from './franchises/franchises.component';
import { FranchiseComponent } from './franchises/item/franchise.component';
import { NationalityComponent } from './nationalities/item/nationality.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    FranchisesComponent,
    NationalitiesComponent,
    SettingsComponent,
    NationalityComponent,
    FranchiseComponent,
  ],
  imports: [CommonModule, DialogModule],
  exports: [SettingsComponent],
})
export class SettingsModule {}
