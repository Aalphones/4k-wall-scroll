import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';
import { AuthGuardService } from './services';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('./components/about/about.module').then((m) => m.AboutModule),
    component: AboutComponent,
  },
  {
    path: 'upload',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./components/upload/upload.module').then((m) => m.UploadModule),
    component: UploadComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
    component: LoginComponent,
  },
  {
    path: 'roll',
    loadChildren: () =>
      import('./components/roll/roll.module').then((m) => m.RollModule),
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
