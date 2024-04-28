import { Person } from '@app/models';
import { sortData } from '@app/utils';
import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const personFigureConfig: (
  persons: Person[],
  disabled: boolean
) => EditDialogConfig[] = (persons: Person[], disabled: boolean) => [
  {
    type: EditDialogType.Text,
    label: 'Beschreibung',
    key: 'description',
  },
  {
    type: EditDialogType.Select,
    label: 'Person',
    key: 'personId',
    disabled,
    options: sortData(persons, 'title').map((person: Person) => {
      return {
        label: person.title,
        value: person.id,
      };
    }),
  },
];
