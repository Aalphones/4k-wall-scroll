import { Component, Input } from '@angular/core';
import { Link, LinkType } from '@app/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faHome,
  faImages,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent {
  @Input() set data(link: Link) {
    this.title = link.name;
    this.url = link.url;
    this.icon = this.getIcon(link.type);
  }

  icon: IconDefinition = faLink;
  title = '';
  url = '';

  constructor() {}

  getIcon(type: LinkType): IconDefinition {
    switch (type) {
      case LinkType.Gallerie:
      case LinkType.Instagram:
        return faImages;
      case LinkType.Homepage:
        return faHome;
      case LinkType.Wikipedia:
        return faBook;
      default:
        return faLink;
    }
  }
}
