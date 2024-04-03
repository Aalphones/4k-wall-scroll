import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorModule } from '../error/error.module';
import { FranchiseModule } from './franchise/franchise.module';
import { WikiPreviewComponent } from './preview/wiki-preview.component';
import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

@NgModule({
  declarations: [WikiComponent, WikiPreviewComponent],
  imports: [CommonModule, WikiRoutingModule, FranchiseModule, ErrorModule],
})
export class WikiModule {}
