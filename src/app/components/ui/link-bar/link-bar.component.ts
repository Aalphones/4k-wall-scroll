import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getEmptyLink, Link } from '@app/models';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { linkDef } from './link.def';

@Component({
  selector: 'app-link-bar',
  templateUrl: './link-bar.component.html',
  styleUrl: './link-bar.component.scss',
})
export class LinkBarComponent {
  readonly addIcon: IconProp = faPlusCircle;

  @Input() set data(data: Link[] | null) {
    if (data) {
      this.links = data;
    }
  }
  @Input() loading: boolean | null = false;

  @Output() update: EventEmitter<Link> = new EventEmitter();

  links: Link[] = [];

  constructor(private dialog: Dialog) {}

  onAdd(): void {
    const emptyLink = getEmptyLink();
    const dialogRef: DialogRef<Link | null> = this.dialog.open<Link | null>(
      EditDialogComponent,
      {
        data: {
          data: emptyLink,
          config: linkDef,
        },
        width: '35rem',
      }
    );

    dialogRef.closed
      .pipe(take(1))
      .subscribe((result: Link | null | undefined) => {
        if (result) {
          this.update.emit({ ...emptyLink, ...result });
        }
      });
  }
}
