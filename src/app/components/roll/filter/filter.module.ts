import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule],
  exports: [FilterComponent],
})
export class FilterModule {}
