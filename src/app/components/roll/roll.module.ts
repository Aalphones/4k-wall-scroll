import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailModule } from './detail/detail.module';
import { ImageRollComponent } from './image-roll/image-roll.component';
import { RolLRoutingModule } from './roll-routing.module';
import { RollComponent } from './roll.component';

@NgModule({
  declarations: [RollComponent, ImageRollComponent],
  imports: [
    CommonModule,
    RolLRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    DetailModule,
  ],
  exports: [RollComponent],
})
export class RollModule {}
