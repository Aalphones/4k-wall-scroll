import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { RollComponent } from './roll.component';

const routes: Routes = [
  { path: ':id', component: DetailComponent },
  { path: '', component: RollComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolLRoutingModule {}
