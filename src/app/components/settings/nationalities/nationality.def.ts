import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const nationalityConfig: EditDialogConfig[] = [
  {
    type: EditDialogType.Image,
    label: 'Flagge',
    key: 'image',
  },
  {
    type: EditDialogType.Text,
    label: 'Name',
    key: 'name',
  },
];
