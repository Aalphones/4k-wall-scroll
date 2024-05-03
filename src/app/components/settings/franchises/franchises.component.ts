import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Franchise, FranchiseUpdate } from '@app/models';
import { getRandomId, updateImage } from '@app/utils';
import { firstValueFrom } from 'rxjs';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { EditDialogLayout } from '../../edit-dialog/edit-dialog.model';
import { franchiseConfig } from './franchise.def';

@Component({
  selector: 'app-franchises',
  templateUrl: './franchises.component.html',
  styleUrl: './franchises.component.scss',
})
export class FranchisesComponent {
  @Input() data: Franchise[] | null = [];

  @Output() update: EventEmitter<FranchiseUpdate> = new EventEmitter();

  constructor(private dialog: Dialog) {}

  async onEdit(item?: Franchise): Promise<void> {
    const toRet: Partial<FranchiseUpdate> = {
      id: item?.id ?? getRandomId(),
      title: item?.title ?? '',
      description: item?.description ?? '',
      parentId: item?.parentId,
    };

    const dialogRef: DialogRef<FranchiseUpdate | null> =
      this.dialog.open<FranchiseUpdate | null>(EditDialogComponent, {
        data: {
          data: toRet,
          config: franchiseConfig(this.data ?? []),
          layout: EditDialogLayout.flex,
        },
        width: '50rem',
      });

    const result: FranchiseUpdate | null | undefined = await firstValueFrom(
      dialogRef.closed
    );

    if (result) {
      const { preview, image } = await updateImage(result.image);

      this.update.emit({ ...toRet, ...result, preview, image });
    }
  }
}
