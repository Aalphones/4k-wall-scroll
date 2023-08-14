import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '@app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  password = '';

  constructor(private authGuard: AuthGuardService, private router: Router) {}

  login(): void {
    this.authGuard.password = this.password;

    if (this.authGuard.isAuthenticated) {
      this.router.navigate(['upload']);
    }
  }
}
