import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import {
  FigureUpdate,
  Franchise,
  getEmptyFigure,
  getEmptyPerson,
  Nationality,
  PersonUpdate,
  RollItem,
} from '@app/models';
import { AppStateFacade } from '@app/store';
import { Observable, take } from 'rxjs';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import {
  EditDialogData,
  EditDialogLayout,
} from '../edit-dialog/edit-dialog.model';
import { figureConfig } from './figure/figure.def';
import { personConfig } from './person/person.def';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent {
  data$: Observable<RollItem[]> = this.facade.data$;
  isLoading$: Observable<boolean> = this.facade.isLoading$;

  constructor(private facade: AppStateFacade, private dialog: Dialog) {}

  onAddFigure(): void {
    this.facade.franchises$
      .pipe(take(1))
      .subscribe((franchises: Franchise[]) => {
        const emptyFigure = getEmptyFigure();
        const dialogRef: DialogRef<FigureUpdate | null> =
          this.dialog.open<FigureUpdate | null>(EditDialogComponent, {
            data: {
              data: emptyFigure,
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
                ...emptyFigure,
                ...result,
                image: result.image ? result.image : undefined,
                preview: result.preview ? result.preview : undefined,
              });
            }
          });
      });
  }

  onAddPerson(): void {
    this.facade.nationalities$
      .pipe(take(1))
      .subscribe((nationalities: Nationality[]) => {
        const emptyPerson = getEmptyPerson();
        const data: EditDialogData<PersonUpdate | null> = {
          data: emptyPerson,
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
                ...emptyPerson,
                ...result,
                description: result.description.replaceAll('"', "'"),
                image: result.image ? result.image : undefined,
                preview: result.preview ? result.preview : undefined,
              });
            }
          });
      });
  }
}
