import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const franchiseConfig: EditDialogConfig[] = [
  {
    type: EditDialogType.Text,
    label: 'Titel',
    key: 'title',
  },
  {
    type: EditDialogType.TextArea,
    label: 'Beschreibung',
    key: 'description',
  },
];
