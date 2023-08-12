import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailComponent } from './detail.component';
import { MetadataComponent } from './metadata/metadata.component';

@NgModule({
  declarations: [DetailComponent, MetadataComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [DetailComponent],
})
export class DetailModule {}
