import { Component } from '@angular/core';
import { AuthGuardService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated = this.auth.isAuthenticated;

  constructor(private auth: AuthGuardService) {}
}
