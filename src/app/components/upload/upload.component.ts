import { Component } from '@angular/core';
import { StableImage } from '@app/models';
import { Observable } from 'rxjs';
import { AppStateFacade } from 'src/app/store/app.facade';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  files: StableImage[] = [];
  tags$: Observable<string[]> = this.facade.tags$;

  constructor(private facade: AppStateFacade) {}

  onSubmit(): void {
    this.facade.add(...this.files);
    this.files = [];
  }
}
