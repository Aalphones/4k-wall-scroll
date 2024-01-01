import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { FranchiseComponent } from './franchise.component';

@NgModule({
  declarations: [FranchiseComponent],
  imports: [CommonModule, FontAwesomeModule, ErrorModule, EditDialogModule],
  exports: [FranchiseComponent],
})
export class FranchiseModule {}
