import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Nationality, NationalityUpdate } from '@app/models';
import { getRandomId, updateImage } from '@app/utils';
import { firstValueFrom } from 'rxjs';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { EditDialogLayout } from '../../edit-dialog/edit-dialog.model';
import { nationalityConfig } from './nationality.def';

@Component({
  selector: 'app-nationalities',
  templateUrl: './nationalities.component.html',
  styleUrl: './nationalities.component.scss',
})
export class NationalitiesComponent {
  @Input() data: Nationality[] | null = [];

  @Output() update: EventEmitter<NationalityUpdate> = new EventEmitter();

  constructor(private dialog: Dialog) {}

  async onEdit(item?: Nationality): Promise<void> {
    const toRet: NationalityUpdate = {
      id: item?.id ?? getRandomId(),
      name: item?.name ?? '',
      image: '',
      preview: '',
    };

    const dialogRef: DialogRef<NationalityUpdate | null> =
      this.dialog.open<NationalityUpdate | null>(EditDialogComponent, {
        data: {
          data: toRet,
          config: nationalityConfig,
          layout: EditDialogLayout.flex,
        },
        width: '30rem',
      });

    const result: NationalityUpdate | null | undefined = await firstValueFrom(
      dialogRef.closed
    );

    if (result) {
      const { preview, image } = await updateImage(result.image);

      this.update.emit({ ...toRet, ...result, preview, image });
    }
  }
}
