export enum EditDialogLayout {
  flex,
  grid,
}

export enum EditDialogType {
  Text,
  TextArea,
  Date,
  Image,
  Select,
  Number,
}

export interface EditDialogConfig {
  type: EditDialogType;
  key: string;
  label: string;
  options?: Option[];
  imageSize?: number;
  disabled?: boolean;
}

export interface Option {
  label: string;
  value: any;
}

export interface EditDialogData<T = unknown> {
  data: T;
  config: EditDialogConfig[];
  layout?: EditDialogLayout;
}
