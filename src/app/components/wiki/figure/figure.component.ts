import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Figure,
  FigureUpdate,
  Franchise,
  Link,
  Person,
  PersonInfo,
} from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, shareReplay, switchMap, take, tap } from 'rxjs';
import { PersonFigureUpdate } from 'src/app/models/name/base.model';
import { environment } from 'src/environments/environment.prod';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { EditDialogLayout } from '../../edit-dialog/edit-dialog.model';
import { figureConfig } from './figure.def';
import { personFigureConfig } from './person.def';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss'],
})
export class FigureComponent {
  readonly addIcon: IconProp = faPlus;
  readonly deleteIcon: IconProp = faTrash;
  readonly editIcon: IconProp = faPencil;

  id$: Observable<number> = this.route.params.pipe(
    tap((params: Params) => {
      this.facade.getFigureLinks(params['id']);
    }),
    map((params: Params) => +params['id']),
    shareReplay(1)
  );

  data$: Observable<Figure | null> = this.id$.pipe(
    switchMap((id: number) => {
      return this.facade.getFiguresDetail$(id);
    })
  );

  imageCover$: Observable<string> = this.data$.pipe(
    map((item: Figure | null) => {
      if (!item) {
        return '';
      } else {
        return `${environment.mediaUrl}/figure/${item.id}.jpg`;
      }
    })
  );

  isAuthenticated = this.auth.isAuthenticated;
  isLoading$: Observable<boolean> = this.facade.figuresLoading$;
  isLinksLoading$: Observable<boolean> = this.facade.figuresLinksLoading$;

  links$: Observable<Link[]> = this.facade.figuresLinks$;

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private auth: AuthGuardService
  ) {}

  onEditPerson(
    event: Event,
    figureId: number,
    person: PersonInfo | null = null
  ): void {
    event.stopPropagation();
    event.preventDefault();

    this.facade.persons$.pipe(take(1)).subscribe((persons: Person[]) => {
      const dialogRef: DialogRef<Partial<PersonFigureUpdate> | null> =
        this.dialog.open<Partial<PersonFigureUpdate> | null>(
          EditDialogComponent,
          {
            data: {
              config: personFigureConfig(persons, !!person),
              data: {
                figureId,
                personId: person?.personId ?? null,
                description: person?.description ?? '',
              },
            },
            width: '35rem',
          }
        );

      dialogRef.closed
        .pipe(take(1))
        .subscribe((result: Partial<PersonFigureUpdate> | null | undefined) => {
          if (result?.personId && result.description) {
            this.facade.updatePersonFigure(
              figureId,
              result.personId,
              result.description
            );
          }
        });
    });
  }

  onDeletePerson(event: Event, person: PersonInfo, figureId: number): void {
    event.stopPropagation();
    event.preventDefault();

    this.facade.deletePersonFigure(figureId, person.personId);
  }

  onOpenDialog(figure: Figure): void {
    this.facade.franchises$
      .pipe(take(1))
      .subscribe((franchises: Franchise[]) => {
        const dialogRef: DialogRef<FigureUpdate | null> =
          this.dialog.open<FigureUpdate | null>(EditDialogComponent, {
            data: {
              data: { ...figure, franchise: figure.franchise.id },
              config: figureConfig(franchises),
              layout: EditDialogLayout.grid,
            },
            width: '65rem',
          });

        dialogRef.closed
          .pipe(take(1))
          .subscribe((result: FigureUpdate | null | undefined) => {
            if (result) {
              this.facade.updateFigure({
                ...figure,
                ...result,
                image: result.image ? result.image : undefined,
                preview: result.preview ? result.preview : undefined,
              });
            }
          });
      });
  }

  onUpdateLink(updated: Link): void {
    this.id$.pipe(take(1)).subscribe((figureId) => {
      this.facade.updateLink({ ...updated, figureId });
    });
  }
}
