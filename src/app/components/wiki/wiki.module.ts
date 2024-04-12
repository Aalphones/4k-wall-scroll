import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorModule } from '../error/error.module';
import { FilterModule, PaginationModule } from '../ui';
import { WikiPreviewComponent } from '../ui/preview/wiki-preview.component';
import { FranchiseModule } from './franchise/franchise.module';
import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

@NgModule({
  declarations: [WikiComponent],
  imports: [
    CommonModule,
    WikiRoutingModule,
    FranchiseModule,
    ErrorModule,
    FilterModule,
    PaginationModule,
    WikiPreviewComponent,
  ],
})
export class WikiModule {}
