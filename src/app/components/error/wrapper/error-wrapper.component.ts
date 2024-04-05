import { Component, HostBinding, Input } from '@angular/core';
import {
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-wrapper',
  templateUrl: './error-wrapper.component.html',
  styleUrls: ['./error-wrapper.component.scss'],
})
export class ErrorWrapperComponent {
  readonly errorIcon = faExclamationTriangle;
  readonly loadingIcon = faSpinner;

  @Input() message = 'Seite wurde nicht gefunden';
  @Input() showError: boolean | null = false;
  @HostBinding('class.isLoading')
  @Input()
  showLoading: boolean | null = false;
}
