import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Person } from '@app/models';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { personConfig } from './person.def';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  readonly editIcon: IconProp = faPencil;

  data$: Observable<Person | null> = this.route.params.pipe(
    switchMap((params: Params) => {
      return this.facade.getPersonsDetail$(params['id']);
    }),
    shareReplay()
  );
  imageCover$: Observable<string> = this.data$.pipe(
    map((item: Person | null) => {
      if (!item) {
        return '';
      } else {
        return `${environment.mediaUrl}/person/${item.id}.jpg`;
      }
    })
  );

  isLoading$: Observable<boolean> = this.facade.personsLoading$;

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private dialog: Dialog
  ) {}

  onOpenDialog(data: Person): void {
    const dialogRef: DialogRef<Person | null> = this.dialog.open<Person | null>(
      EditDialogComponent,
      {
        data: { data, config: personConfig },
        width: '45rem',
      }
    );

    dialogRef.closed
      .pipe(take(1))
      .subscribe((result: Person | null | undefined) => {
        if (result) {
          this.facade.updatePerson(result);
        }
      });
  }
}
