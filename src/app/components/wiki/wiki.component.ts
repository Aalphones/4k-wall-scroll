import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FigureInfo,
  FigureUpdate,
  Franchise,
  getEmptyFigure,
  getEmptyPerson,
  isFigure,
  isPerson,
  Nationality,
  PersonInfo,
  PersonUpdate,
  RollItem,
} from '@app/models';
import { AuthGuardService } from '@app/services';
import { AppStateFacade } from '@app/store';
import { updateImage } from '@app/utils';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseRollDirective } from 'src/app/utils/base-roll.directive';
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
export class WikiComponent extends BaseRollDirective<RollItem> {
  data$: Observable<RollItem[]> = this.facade.data$;
  isAuthenticated = this.auth.isAuthenticated;
  isLoading$: Observable<boolean> = this.facade.isLoading$;

  constructor(
    private facade: AppStateFacade,
    private dialog: Dialog,
    private auth: AuthGuardService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
    this.initPaging('');
  }

  filterByText(items: RollItem[], text: string): RollItem[] {
    if (!text) {
      return items;
    }
    const lowercaseSearch = text.toLowerCase();

    return items.filter((item: RollItem) => {
      const containsStringInName: boolean = item.title
        .toLowerCase()
        .includes(lowercaseSearch);

      if (isFigure(item)) {
        const containsStringInFirstSeen = item.firstSeen
          .toLowerCase()
          .includes(lowercaseSearch);

        const containsStringInFranchise = item.franchise.title
          .toLowerCase()
          .includes(lowercaseSearch);

        const containsStringInPersons = item.persons.some(
          (person: PersonInfo) =>
            person.title.toLowerCase().includes(lowercaseSearch)
        );

        return (
          containsStringInName ||
          containsStringInFirstSeen ||
          containsStringInFranchise ||
          containsStringInPersons
        );
      } else if (isPerson(item)) {
        const containsStringInFigures = item.figures.some(
          (figure: FigureInfo) =>
            figure.title.toLowerCase().includes(lowercaseSearch)
        );

        return containsStringInName || containsStringInFigures;
      } else {
        return containsStringInName;
      }
    });
  }

  async onAddFigure(): Promise<void> {
    const franchises: Franchise[] = await firstValueFrom(
      this.facade.franchises$
    );
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

    const result: FigureUpdate | null | undefined = await firstValueFrom(
      dialogRef.closed
    );
    if (result) {
      const { preview, image } = await updateImage(result.image);

      this.facade.updateFigure({
        ...emptyFigure,
        ...result,
        description: result.description.replaceAll('"', "'"),
        preview,
        image,
      });
    }
  }

  async onAddPerson(): Promise<void> {
    const nationalities: Nationality[] = await firstValueFrom(
      this.facade.nationalities$
    );
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

    const result: PersonUpdate | null | undefined = await firstValueFrom(
      dialogRef.closed
    );
    if (result) {
      const { preview, image } = await updateImage(result.image);

      this.facade.updatePerson({
        ...emptyPerson,
        ...result,
        description: result.description.replaceAll('"', "'"),
        image,
        preview,
      });
    }
  }
}
