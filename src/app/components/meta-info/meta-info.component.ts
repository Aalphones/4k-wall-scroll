import { Component, Input } from '@angular/core';
import { createEmptyStableImage, StableImage } from '@app/models';
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
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: ['./meta-info.component.scss'],
})
export class MetaInfoComponent {
  readonly cfgIcon: IconProp = faRuler;
  readonly modelIcon: IconProp = faMicrochip;
  readonly negativePromptIcon: IconProp = faCommentSlash;
  readonly promptIcon: IconProp = faCommentDots;
  readonly resolutionIcon: IconProp = faImage;
  readonly stepsIcon: IconProp = faShoePrints;
  readonly samplerIcon: IconProp = faCirclePlay;
  readonly seedIcon: IconProp = faSeedling;

  @Input() image: StableImage = createEmptyStableImage();
  @Input() tags: string[] | null = null;

  constructor() {}

  onCopy(value: string): void {
    navigator.clipboard.writeText(value);
  }
}
