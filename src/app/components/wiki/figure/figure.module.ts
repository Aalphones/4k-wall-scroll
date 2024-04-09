import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenderComponent, LinkBarModule } from '@app/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
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
    LinkBarModule,
  ],
  exports: [FigureComponent],
})
export class FigureModule {}
