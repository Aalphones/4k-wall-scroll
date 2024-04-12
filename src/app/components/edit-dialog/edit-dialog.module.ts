import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogComponent } from './edit-dialog.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    EditDialogComponent,
    FileInputComponent,
    ImageCropperComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [EditDialogComponent],
})
export class EditDialogModule {}
