import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuardService } from './services';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./components/about/about.module').then((m) => m.AboutModule),
    component: AboutComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
    component: LoginComponent,
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.module').then((m) => m.SettingsModule),
    canActivate: [AuthGuardService],
    component: SettingsComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/wiki/wiki.module').then((m) => m.WikiModule),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
