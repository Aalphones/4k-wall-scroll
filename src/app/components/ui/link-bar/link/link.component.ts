import { Component, Input } from '@angular/core';
import { Link } from '@app/models';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent {
  @Input() data!: Link;
}
