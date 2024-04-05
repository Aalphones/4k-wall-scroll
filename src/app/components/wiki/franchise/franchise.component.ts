import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Franchise } from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { franchiseConfig } from './franchise.def';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss'],
})
export class FranchiseComponent {
  readonly editIcon: IconProp = faPencil;

  data$: Observable<Franchise | null> = this.route.params.pipe(
    switchMap((params: Params) => {
      return this.facade.getFranchiseDetail$(params['id']);
    }),
    shareReplay()
  );
  imageCover$: Observable<string> = this.data$.pipe(
    map((item: Franchise | null) => {
      if (!item) {
        return '';
      } else {
        return `${environment.mediaUrl}/franchise/cover/${item.id}.jpg`;
      }
    })
  );

  isLoading$: Observable<boolean> = this.facade.franchisesLoading$;
  isAuthenticated = this.auth.isAuthenticated;

  constructor(
    private facade: AppStateFacade,
    private route: ActivatedRoute,
    private auth: AuthGuardService,
    private dialog: Dialog
  ) {}

  onOpenDialog(data: Franchise): void {
    const dialogRef: DialogRef<Franchise | null> =
      this.dialog.open<Franchise | null>(EditDialogComponent, {
        data: { data, config: franchiseConfig },
        width: '45rem',
      });

    dialogRef.closed
      .pipe(take(1))
      .subscribe((result: Franchise | null | undefined) => {
        if (result) {
          this.facade.updateFranchise(result);
        }
      });
  }
}
