import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { FigureComponent } from './figure.component';

@NgModule({
  declarations: [FigureComponent],
  imports: [CommonModule, FontAwesomeModule, ErrorModule, EditDialogModule],
  exports: [FigureComponent],
})
export class FigureModule {}
