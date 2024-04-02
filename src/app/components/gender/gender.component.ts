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
  imports: [FontAwesomeModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderComponent {
  @Input() set gender(gender: Gender | null) {
    if (gender) {
      this.icon = this.getIcon(gender);
    }

    this.isBlue = gender === Gender.male;
    this.isPink = gender === Gender.female;
  }

  icon: IconProp = faGenderless;
  isBlue = false;
  isPink = false;

  constructor() {}

  getIcon(gender: Gender): IconProp {
    switch (gender) {
      case Gender.female:
        return faVenus;
      case Gender.male:
        return faMars;
      default:
        return faGenderless;
    }
  }
}
