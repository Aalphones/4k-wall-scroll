import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  retrieveSettings,
  storeSettings,
  UserSettings,
  userSettingsKey,
} from '../models/user-settings.model';

@Injectable({ providedIn: 'root' })
export class AuthGuardService  {
  password = this.retrievePassword();

  get isAuthenticated(): boolean {
    return environment.password === this.password;
  }

  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  login(appPassword: string): void {
    const currentSettings = retrieveSettings();
    storeSettings({
      ...currentSettings,
      appPassword,
    });

    this.password = appPassword;

    if (this.isAuthenticated) {
      this.router.navigate(['upload']);
    }
  }

  private retrievePassword(): string | null {
    const serializedSettings = localStorage.getItem(userSettingsKey);

    if (serializedSettings) {
      const parsed: UserSettings = JSON.parse(serializedSettings);
      return parsed.appPassword;
    }

    return '';
  }
}
