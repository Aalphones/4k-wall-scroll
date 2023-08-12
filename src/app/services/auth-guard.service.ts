import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserSettings, userSettingsKey } from '../models/user-settings.model';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  password = '';

  get isAuthenticated(): boolean {
    const storedPassword = this.retrievePassword();

    return !storedPassword || storedPassword === this.password;
  }

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  private retrievePassword(): string | null {
    const serializedSettings = localStorage.getItem(userSettingsKey);

    if (serializedSettings) {
      const parsed: UserSettings = JSON.parse(serializedSettings);
      return parsed.appPassword;
    }

    return environment.password;
  }
}
