import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Nationality, Person, PersonUpdate } from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCakeCandles,
  faMapPin,
  faPencil,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, shareReplay, switchMap, take } from 'rxjs';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import {
  EditDialogData,
  EditDialogLayout,
} from '../../edit-dialog/edit-dialog.model';
import { personConfig } from './person.def';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  readonly birthIcon: IconProp = faCakeCandles;
  readonly deathIcon: IconProp = faSkull;
  readonly editIcon: IconProp = faPencil;
  readonly locationIcon: IconProp = faMapPin;

  data$: Observable<Person | null> = this.route.params.pipe(
    switchMap((params: Params) => {
      return this.facade.getPersonsDetail$(params['id']);
    }),
    shareReplay()
  );

  isAuthenticated = this.auth.isAuthenticated;
  isLoading$: Observable<boolean> = this.facade.personsLoading$;

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private auth: AuthGuardService
  ) {}

  onOpenDialog(person: Person): void {
    this.facade.nationalities$
      .pipe(take(1))
      .subscribe((nationalities: Nationality[]) => {
        const data: EditDialogData<PersonUpdate | null> = {
          data: { ...person, nationality: person.nationality.id },
          config: personConfig(nationalities),
          layout: EditDialogLayout.grid,
        };

        const dialogRef: DialogRef<PersonUpdate | null> =
          this.dialog.open<PersonUpdate | null>(EditDialogComponent, {
            data,
            width: '65rem',
          });

        dialogRef.closed
          .pipe(take(1))
          .subscribe((result: PersonUpdate | null | undefined) => {
            if (result) {
              this.facade.updatePerson({
                ...person,
                ...result,
                image: result.image ? result.image : undefined,
                preview: result.preview ? result.preview : undefined,
              });
            }
          });
      });
  }
}
