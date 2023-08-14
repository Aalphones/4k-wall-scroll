import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MetaInfoComponent } from './meta-info.component';

@NgModule({
  declarations: [MetaInfoComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [MetaInfoComponent],
})
export class MetaInfoModule {}
