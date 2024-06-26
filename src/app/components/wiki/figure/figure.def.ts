import { Franchise, Gender } from '@app/models';
import { sortData } from '@app/utils';
import {
  EditDialogConfig,
  EditDialogType
} from '../../edit-dialog/edit-dialog.model';

export const figureConfig: (franchises: Franchise[]) => EditDialogConfig[] = (
  franchises: Franchise[]
) => [
  {
    type: EditDialogType.Image,
    label: 'Coverfoto',
    key: 'image',
    fullWidth: true
  },
  {
    type: EditDialogType.Text,
    label: 'Titel',
    key: 'title',
  },
  {
    type: EditDialogType.Text,
    label: 'Typ',
    key: 'type',
  },
  {
    type: EditDialogType.Select,
    label: 'Franchise',
    key: 'franchise',
    options: sortData(franchises, 'title').map((item: Franchise) => {
      return {
        label: item.title,
        value: item.id,
      };
    }),
  },
  {
    type: EditDialogType.Text,
    label: 'Erster Auftritt',
    key: 'firstSeen',
  },
  {
    type: EditDialogType.Number,
    label: 'Premieren Jahr',
    key: 'firstSeenYear',
  },
  {
    type: EditDialogType.Select,
    label: 'Geschlecht',
    key: 'gender',
    options: [
      { label: 'Weiblich', value: Gender.female },
      { label: 'Männlich', value: Gender.male },
      { label: 'Divers', value: Gender.various },
    ],
  },
  {
    type: EditDialogType.TextArea,
    label: 'Beschreibung',
    key: 'description',
    fullWidth: true
  },
];
