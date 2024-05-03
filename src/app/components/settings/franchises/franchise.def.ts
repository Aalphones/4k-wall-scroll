import { Franchise } from '@app/models';
import { sortData } from '@app/utils';
import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const franchiseConfig: (
  franchises: Franchise[]
) => EditDialogConfig[] = (franchises: Franchise[]) => [
  {
    type: EditDialogType.Image,
    label: 'Logo',
    key: 'image',
  },
  {
    type: EditDialogType.Text,
    label: 'Name',
    key: 'title',
  },
  {
    type: EditDialogType.TextArea,
    label: 'Beschreibung',
    key: 'description',
  },
  {
    type: EditDialogType.Select,
    label: 'Mutterkonzern',
    key: 'parentId',
    options: sortData(franchises, 'title').map((item: Franchise) => {
      return {
        label: item.title,
        value: item.id,
      };
    }),
  },
];
