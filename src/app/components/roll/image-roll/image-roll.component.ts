import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { StableImage } from '@app/models';

@Component({
  selector: 'app-image-roll',
  templateUrl: './image-roll.component.html',
  styleUrls: ['./image-roll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageRollComponent implements OnChanges {
  @Input() images: StableImage[] = [];

  constructor(private elRef: ElementRef) {}

  ngOnChanges(): void {
    this.elRef.nativeElement.scrollTop = 0;
  }
}
