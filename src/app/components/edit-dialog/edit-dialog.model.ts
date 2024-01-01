export enum EditDialogType {
  Text,
  TextArea,
  Date,
  Image,
}

export interface EditDialogConfig {
  type: EditDialogType;
  key: string;
  label: string;
}
