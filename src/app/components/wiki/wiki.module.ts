import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FranchiseModule } from './franchise/franchise.module';
import { WikiPreviewComponent } from './preview/wiki-preview.component';
import { WikiRollComponent } from './roll/wiki-roll.component';
import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

@NgModule({
  declarations: [WikiComponent, WikiRollComponent, WikiPreviewComponent],
  imports: [CommonModule, WikiRoutingModule, FranchiseModule],
})
export class WikiModule {}
