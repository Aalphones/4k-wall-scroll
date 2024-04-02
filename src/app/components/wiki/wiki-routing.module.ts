import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FigureComponent } from './figure/figure.component';
import { FranchiseComponent } from './franchise/franchise.component';
import { PersonComponent } from './person/person.component';
import { WikiComponent } from './wiki.component';

const routes: Routes = [
  { path: '', component: WikiComponent },
  {
    path: 'franchise/:id',
    loadChildren: () =>
      import('./franchise/franchise.module').then((m) => m.FranchiseModule),
    component: FranchiseComponent,
  },
  {
    path: 'person/:id',
    loadChildren: () =>
      import('./person/person.module').then((m) => m.PersonModule),
    component: PersonComponent,
  },
  {
    path: 'figure/:id',
    loadChildren: () =>
      import('./figure/figure.module').then((m) => m.FigureModule),
    component: FigureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikiRoutingModule {}
