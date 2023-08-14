import { Component } from '@angular/core';
import { createEmptyStableImage, StableImage } from '@app/models';
import { Observable } from 'rxjs';
import { AppStateFacade } from 'src/app/store/app.facade';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  file: StableImage = createEmptyStableImage();
  tags$: Observable<string[]> = this.facade.tags$;

  get preview(): string {
    if (!this.file.thumbnail) {
      return './assets/unknown-image.jpg';
    } else {
      return this.file.thumbnail;
    }
  }

  constructor(private facade: AppStateFacade) {}

  onSubmit(): void {
    this.facade.add(this.file);
    this.file = createEmptyStableImage();
  }
}
