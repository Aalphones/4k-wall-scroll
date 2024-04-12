import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import {
  EditDialogData,
  EditDialogLayout,
  EditDialogType,
} from './edit-dialog.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent<T = any> {
  readonly EditDialogType = EditDialogType;

  isGridView = false;
  requestForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private dialogRef: DialogRef<Partial<T> | null>,
    @Inject(DIALOG_DATA)
    public dialogData: EditDialogData<T>
  ) {
    this.initForm(dialogData);
  }

  onClose(save: boolean): void {
    if (save) {
      this.dialogRef.close(this.requestForm.value);
    } else {
      this.dialogRef.close(null);
    }
  }

  private initForm(input: EditDialogData<T>): void {
    for (const configItem of input.config) {
      const key = configItem.key;
      const value: any = (input as any).data[key] ?? null;
      const control = new FormControl(value);
      this.requestForm.addControl(key, control);

      if (configItem.disabled) {
        control.disable();
      }
    }

    if (input.layout === EditDialogLayout.grid) {
      this.isGridView = true;
    }
  }
}
