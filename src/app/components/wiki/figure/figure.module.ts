import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { GenderComponent } from '../../ui/gender/gender.component';
import { CoverComponent } from './cover/cover.component';
import { FigureComponent } from './figure.component';

@NgModule({
  declarations: [FigureComponent, CoverComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ErrorModule,
    EditDialogModule,
    GenderComponent,
  ],
  exports: [FigureComponent],
})
export class FigureModule {}
