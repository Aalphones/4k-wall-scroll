import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Gender } from '@app/models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGenderless,
  faMars,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderComponent {
  @Input() set gender(gender: Gender | null) {
    if (gender === Gender.female) {
      this.icon = faVenus;
      this.isPink = true;
      this.label = 'Weiblich';
    } else if (gender === Gender.male) {
      this.icon = faMars;
      this.isBlue = true;
      this.label = 'Männlich';
    }
  }
  @Input() withLabel = true;

  icon: IconProp = faGenderless;
  isBlue = false;
  isPink = false;
  label = 'Ohne Geschlecht';

  constructor() {}
}
