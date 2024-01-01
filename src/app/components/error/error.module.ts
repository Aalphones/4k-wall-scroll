import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorWrapperComponent } from './wrapper/error-wrapper.component';

@NgModule({
  declarations: [ErrorWrapperComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ErrorWrapperComponent],
})
export class ErrorModule {}
