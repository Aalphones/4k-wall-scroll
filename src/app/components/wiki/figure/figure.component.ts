import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Figure, FigureUpdate, Franchise } from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { EditDialogLayout } from '../../edit-dialog/edit-dialog.model';
import { figureConfig } from './figure.def';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss'],
})
export class FigureComponent {
  readonly editIcon: IconProp = faPencil;

  data$: Observable<Figure | null> = this.route.params.pipe(
    switchMap((params: Params) => {
      return this.facade.getFiguresDetail$(params['id']);
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

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private auth: AuthGuardService
  ) {}

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
}
