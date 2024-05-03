import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Figure,
  FigureInfo,
  Link,
  Nationality,
  Person,
  PersonUpdate,
} from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { updateImage } from '@app/utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCakeCandles,
  faMapPin,
  faPencil,
  faPlus,
  faSkull,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
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

  id$: Observable<number> = this.route.params.pipe(
    tap((params: Params) => {
      this.facade.getPersonsLinks(params['id']);
    }),
    map((params: Params) => +params['id']),
    shareReplay(1)
  );

  data$: Observable<Person | null> = this.id$.pipe(
    switchMap((id: number) => {
      return this.facade.getPersonsDetail$(id);
    })
  );

  isAuthenticated = this.auth.isAuthenticated;
  isLoading$: Observable<boolean> = this.facade.personsLoading$;
  isLinksLoading$: Observable<boolean> = this.facade.personsLinksLoading$;

  links$: Observable<Link[]> = this.facade.personsLinks$;

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private auth: AuthGuardService
  ) {}

  async onEditFigure(
    event: Event,
    personId: number,
    figure: FigureInfo | null = null
  ): Promise<void> {
    event.stopPropagation();
    event.preventDefault();

    const figures: Figure[] = await firstValueFrom(this.facade.figures$);
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

    const result: Partial<PersonFigureUpdate> | null | undefined =
      await firstValueFrom(dialogRef.closed);
    if (result) {
      this.facade.updatePersonFigure(
        result.figureId ?? (figure?.figureId as number),
        personId,
        result.description ?? ''
      );
    }
  }

  onDeleteFigure(event: Event, figure: FigureInfo, personId: number): void {
    event.stopPropagation();
    event.preventDefault();

    this.facade.deletePersonFigure(figure.figureId, personId);
  }

  async onOpenDialog(person: Person): Promise<void> {
    const nationalities: Nationality[] = await firstValueFrom(
      this.facade.nationalities$
    );
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

    const result: PersonUpdate | null | undefined = await firstValueFrom(
      dialogRef.closed
    );
    if (result) {
      const { preview, image } = await updateImage(result.image);

      this.facade.updatePerson({
        ...person,
        ...result,
        description: result.description.replaceAll('"', "'"),
        image,
        preview,
      });
    }
  }

  onUpdateLink(updated: Link): void {
    this.id$.pipe(take(1)).subscribe((personId) => {
      this.facade.updateLink({ ...updated, personId });
    });
  }
}
