import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StableImage } from '@app/models';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCirclePlay,
  faCommentDots,
  faCommentSlash,
  faImage,
  faMicrochip,
  faRuler,
  faSeedling,
  faShoePrints,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease', style({ opacity: 1 })),
  ]),
]);

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  animations: [fadeIn],
})
export class MetadataComponent implements OnInit, OnDestroy {
  readonly cfgIcon: IconProp = faRuler;
  readonly modelIcon: IconProp = faMicrochip;
  readonly negativePromptIcon: IconProp = faCommentSlash;
  readonly promptIcon: IconProp = faCommentDots;
  readonly resolutionIcon: IconProp = faImage;
  readonly stepsIcon: IconProp = faShoePrints;
  readonly samplerIcon: IconProp = faCirclePlay;
  readonly seedIcon: IconProp = faSeedling;
  readonly deleteIcon: IconProp = faTrashAlt;

  @Input() image!: StableImage;
  @Input() tags: string[] = [];

  updateForm = new UntypedFormGroup({
    name: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
  });

  isDeleteDisplayed = false;

  constructor(private facade: AppStateFacade, private router: Router) {}

  ngOnInit(): void {
    this.updateForm.patchValue(this.image);
  }

  ngOnDestroy(): void {
    if (this.updateForm.dirty) {
      this.facade.update({ ...this.image, ...this.updateForm.value });
    }
  }

  onCopy(value: string): void {
    navigator.clipboard.writeText(value);
  }

  onDelete(): void {
    this.updateForm.markAsPristine();
    this.facade.delete(this.image);
    this.router.navigate(['/roll']);
  }

  onToggleDelete(): void {
    this.isDeleteDisplayed = !this.isDeleteDisplayed;
  }
}
