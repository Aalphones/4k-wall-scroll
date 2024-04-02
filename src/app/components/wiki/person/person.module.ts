import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { PersonComponent } from './person.component';

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule, FontAwesomeModule, ErrorModule, EditDialogModule],
  exports: [PersonComponent],
})
export class PersonModule {}
