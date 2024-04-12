import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrl: './image-cropper.component.scss',
})
export class ImageCropperComponent implements ControlValueAccessor {
  readonly uploadIcon: IconProp = faUpload;

  @Input() control: FormControl = new FormControl(null);
  @Input() resize: number | undefined = undefined;

  currentValue: string | string[] | null = null;
  uploadValue = '';

  constructor() {}

  _onChange: (_: string | string[] | null) => void = () => {};
  _onTouched: () => void = () => {};

  onChange(nextValue: string | string[] | null): void {
    this._onChange(nextValue);
    this.control.setValue(nextValue);

    this._onTouched();
  }

  writeValue(value: string | string[] | null): void {
    this.currentValue = value ?? null;
  }

  registerOnChange(fn: (_: string | string[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
