import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { resizeImage } from '@app/utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  readonly uploadIcon: IconProp = faUpload;

  @ViewChild('input')
  inputRef!: ElementRef<HTMLInputElement>;

  @Input() control: FormControl = new FormControl(null);
  @Input() multiple: boolean = false;
  @Input() resize: number | undefined = undefined;

  @HostListener('click', ['$event.target'])
  onClick() {
    this.inputRef.nativeElement.click();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.handleDragEnd(event);
    const files: FileList | undefined = event.dataTransfer?.files;

    if (files && files?.length === 1) {
      this.readFile(files[0]);
    } else if (this.multiple && files && files?.length >= 1) {
      this.readMultipleFiles(files);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    this.handleDragStart(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.handleDragEnd(event);
  }

  currentValue: string | string[] | null = null;
  uploadValue = '';

  get preview(): string | null {
    if (Array.isArray(this.currentValue)) {
      return this.currentValue[0];
    } else {
      return this.currentValue ?? null;
    }
  }

  @HostBinding('class.fileInput--draggedOver') private isDragging = false;
  private multiUploadList: string[] = [];

  constructor() {}

  _onChange: (_: string | string[] | null) => void = () => {};
  _onTouched: () => void = () => {};

  onChange(nextValue: string | string[] | null): void {
    this._onChange(nextValue);
    this.control.setValue(nextValue);

    this._onTouched();
  }

  onFileChange(): void {
    const files: FileList = this.inputRef.nativeElement.files!;

    if (this.multiple) {
      this.readMultipleFiles(files);
    } else {
      this.readFile(files[0]);
    }
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

  private handleDragEnd(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = false;
  }

  private handleDragStart(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;
  }

  private isValidFileType(file: File): boolean {
    return file.type.includes('image');
  }

  private readFile(file: File): void {
    if (!this.isValidFileType(file)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result?.toString() ?? '';

      this.setResult(data);
    };
  }

  private readMultipleFiles(files: FileList): void {
    this.multiUploadList = [];

    for (let index = 0; index < files.length; index++) {
      this.readFile(files[index]);
    }
  }

  private async setResult(data: string): Promise<void> {
    let result = data;
    if (this.resize) {
      result = await resizeImage(data, this.resize);
    }

    if (this.multiple && result) {
      this.multiUploadList.push(result);
      this.onChange(this.multiUploadList);
      this.currentValue = this.multiUploadList;
    } else if (result) {
      this.onChange(result);
      this.currentValue = result;
    }
  }
}
