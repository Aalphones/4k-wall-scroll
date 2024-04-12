import { Person } from '@app/models';
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
    options: persons.map((person: Person) => {
      return {
        label: person.title,
        value: person.id,
      };
    }),
  },
];
