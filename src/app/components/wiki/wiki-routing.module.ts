import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FranchiseComponent } from './franchise/franchise.component';
import { WikiComponent } from './wiki.component';

const routes: Routes = [
  { path: '', component: WikiComponent },
  {
    path: 'franchise/:id',
    loadChildren: () =>
      import('./franchise/franchise.module').then((m) => m.FranchiseModule),
    component: FranchiseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikiRoutingModule {}
