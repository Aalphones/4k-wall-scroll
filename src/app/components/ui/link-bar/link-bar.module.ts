import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkBarComponent } from './link-bar.component';
import { LinkComponent } from './link/link.component';

@NgModule({
  declarations: [LinkBarComponent, LinkComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LinkBarComponent],
})
export class LinkBarModule {}
