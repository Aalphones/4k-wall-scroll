import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Figure,
  FigureInfo,
  Nationality,
  Person,
  PersonUpdate,
} from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCakeCandles,
  faMapPin,
  faPencil,
  faPlus,
  faSkull,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, shareReplay, switchMap, take } from 'rxjs';
import { PersonFigureUpdate } from 'src/app/models/name/base.model';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import {
  EditDialogData,
  EditDialogLayout,
} from '../../edit-dialog/edit-dialog.model';
import { personFigureConfig } from './figure.def';
import { personConfig } from './person.def';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  readonly addIcon: IconProp = faPlus;
  readonly birthIcon: IconProp = faCakeCandles;
  readonly deathIcon: IconProp = faSkull;
  readonly deleteIcon: IconProp = faTrash;
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

  onEditFigure(
    event: Event,
    personId: number,
    figure: FigureInfo | null = null
  ): void {
    event.stopPropagation();
    event.preventDefault();

    this.facade.figures$.pipe(take(1)).subscribe((figures: Figure[]) => {
      const dialogRef: DialogRef<Partial<PersonFigureUpdate> | null> =
        this.dialog.open<Partial<PersonFigureUpdate> | null>(
          EditDialogComponent,
          {
            data: {
              config: personFigureConfig(figures, !!figure),
              data: {
                personId,
                figureId: figure?.figureId ?? null,
                description: figure?.description ?? '',
              },
            },
            width: '35rem',
          }
        );

      dialogRef.closed
        .pipe(take(1))
        .subscribe((result: Partial<PersonFigureUpdate> | null | undefined) => {
          if (result?.figureId && result.description) {
            this.facade.updatePersonFigure(
              result.figureId,
              personId,
              result.description
            );
          }
        });
    });
  }

  onDeleteFigure(event: Event, figure: FigureInfo, personId: number): void {
    event.stopPropagation();
    event.preventDefault();

    this.facade.deletePersonFigure(figure.figureId, personId);
  }

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
