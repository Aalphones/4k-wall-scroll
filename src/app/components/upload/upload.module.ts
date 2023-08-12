import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileInputComponent } from './file-input/file-input.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent, UploadFormComponent, FileInputComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [UploadComponent],
})
export class UploadModule {}
