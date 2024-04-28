import { Gender, Nationality } from '@app/models';
import { sortData } from '@app/utils';
import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const personConfig: (
  nationalities: Nationality[]
) => EditDialogConfig[] = (nationalities: Nationality[]) => [
  {
    type: EditDialogType.Image,
    label: 'Vorschaufoto',
    key: 'preview',
    imageSize: 256,
  },
  {
    type: EditDialogType.Image,
    label: 'Coverfoto',
    key: 'image',
  },
  {
    type: EditDialogType.Text,
    label: 'Titel',
    key: 'title',
  },
  {
    type: EditDialogType.Text,
    label: 'Bezeichnung',
    key: 'profession',
  },
  {
    type: EditDialogType.Number,
    label: 'Größe',
    key: 'height',
  },
  {
    type: EditDialogType.Date,
    label: 'Geburtstag',
    key: 'birthday',
  },
  {
    type: EditDialogType.Text,
    label: 'Geburtsort',
    key: 'birthplace',
  },
  {
    type: EditDialogType.Select,
    label: 'Nationalität',
    key: 'nationality',
    options: sortData(nationalities, 'name').map((item: Nationality) => {
      return {
        label: item.name,
        value: item.id,
      };
    }),
  },
  {
    type: EditDialogType.Date,
    label: 'Todestag',
    key: 'death',
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
  },
];
