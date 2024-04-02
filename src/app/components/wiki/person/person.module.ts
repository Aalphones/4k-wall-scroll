import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { GenderComponent } from '../../gender/gender.component';
import { CoverComponent } from './cover/cover.component';
import { PersonComponent } from './person.component';

@NgModule({
  declarations: [PersonComponent, CoverComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ErrorModule,
    EditDialogModule,
    GenderComponent,
  ],
  exports: [PersonComponent],
})
export class PersonModule {}
