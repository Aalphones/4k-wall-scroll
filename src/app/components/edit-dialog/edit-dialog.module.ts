import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog.component';

@NgModule({
  declarations: [EditDialogComponent],
  imports: [CommonModule, DialogModule, ReactiveFormsModule],
  exports: [EditDialogComponent],
})
export class EditDialogModule {}
