import { Figure } from '@app/models';
import { sortData } from '@app/utils';
import {
  EditDialogConfig,
  EditDialogType,
} from '../../edit-dialog/edit-dialog.model';

export const personFigureConfig: (
  figures: Figure[],
  disabled: boolean
) => EditDialogConfig[] = (persons: Figure[], disabled: boolean) => [
  {
    type: EditDialogType.Text,
    label: 'Beschreibung',
    key: 'description',
  },
  {
    type: EditDialogType.Select,
    label: 'Charakter',
    key: 'figureId',
    disabled,
    options: sortData(persons, 'title').map((figure: Figure) => {
      return {
        label: figure.title,
        value: figure.id,
      };
    }),
  },
];
