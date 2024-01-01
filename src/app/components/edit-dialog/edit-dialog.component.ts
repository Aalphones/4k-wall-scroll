import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { EditDialogConfig, EditDialogType } from './edit-dialog.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent<T = any> {
  readonly EditDialogType = EditDialogType;

  requestForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private dialogRef: DialogRef<Partial<T> | null>,
    @Inject(DIALOG_DATA)
    public dialogData: { data: T; config: EditDialogConfig[] }
  ) {
    console.log(dialogData);
    this.initForm(dialogData.config, dialogData.data);
    console.log(this.requestForm);
  }

  onClose(save: boolean): void {
    if (save) {
      this.dialogRef.close(this.requestForm.value);
    } else {
      this.dialogRef.close(null);
    }
  }

  private initForm(config: EditDialogConfig[], data: any): void {
    for (const configItem of config) {
      const key = configItem.key;
      this.requestForm.addControl(key, new FormControl(data[key] ?? null));
    }
  }
}
