import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Figure } from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
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
    }),
    shareReplay()
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

  onOpenDialog(data: Figure): void {
    const dialogRef: DialogRef<Figure | null> = this.dialog.open<Figure | null>(
      EditDialogComponent,
      {
        data: { data, config: figureConfig },
        width: '45rem',
      }
    );

    dialogRef.closed
      .pipe(take(1))
      .subscribe((result: Figure | null | undefined) => {
        if (result) {
          this.facade.updateFigure(result);
        }
      });
  }
}
