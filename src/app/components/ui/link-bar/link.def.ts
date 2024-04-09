import { LinkType } from '@app/models';
import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const linkDef: EditDialogConfig[] = [
  {
    type: EditDialogType.Text,
    label: 'Bezeichnung',
    key: 'name',
  },
  {
    type: EditDialogType.Text,
    label: 'Url',
    key: 'url',
  },
  {
    type: EditDialogType.Select,
    label: 'Typ',
    key: 'type',
    options: [
      ...Object.entries(LinkType).map(([label, value]) => {
        return {
          label,
          value,
        };
      }),
    ],
  },
];
