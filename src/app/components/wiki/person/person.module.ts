import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { HeightPipe } from 'src/app/pipes/height.pipe';
import { EditDialogModule } from '../../edit-dialog/edit-dialog.module';
import { ErrorModule } from '../../error/error.module';
import { GenderComponent } from '../../ui/gender';
import { WikiPreviewComponent } from '../../ui/preview/wiki-preview.component';
import { CoverComponent } from './cover/cover.component';
import { PersonComponent } from './person.component';

@NgModule({
  declarations: [PersonComponent, CoverComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ErrorModule,
    EditDialogModule,
    GenderComponent,
    AgePipe,
    HeightPipe,
    WikiPreviewComponent,
  ],
  exports: [PersonComponent],
})
export class PersonModule {}
