import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

@NgModule({
  declarations: [WikiComponent],
  imports: [CommonModule, WikiRoutingModule],
})
export class WikiModule {}
