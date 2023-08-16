import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createEmptyStableImage, StableImage } from '@app/models';
import { getDimensions, getExtensionFromName, resizeImage } from '@app/utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import exifr from 'exifr';

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

  @HostListener('click', ['$event.target'])
  onClick() {
    this.inputRef.nativeElement.click();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.handleDragEnd(event);
    const files: FileList | undefined = event.dataTransfer?.files;

    if (files && files?.length >= 1) {
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

  currentValue: StableImage = createEmptyStableImage();
  uploadValue = '';

  get preview(): string {
    if (!this.currentValue.thumbnail) {
      return './assets/unknown-image.jpg';
    } else {
      return this.currentValue.thumbnail;
    }
  }

  @HostBinding('class.fileInput--draggedOver') private dragTimer: any = null;

  constructor() {}

  _onChange: (_: StableImage) => void = () => {};
  _onTouched: () => void = () => {};

  onFileChange(): void {
    const files: FileList = this.inputRef.nativeElement.files!;

    this.readMultipleFiles(files);
  }

  writeValue(value: StableImage): void {
    this.currentValue = value ?? createEmptyStableImage();
  }

  registerOnChange(fn: (_: StableImage) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  private async addImage(file: File, data: string): Promise<void> {
    const extension = getExtensionFromName(file.name);
    const name = file.name.replace(extension, '');

    const exifData = await exifr.parse(data, true);

    if (extension === '.png' || extension === '.original.jpg') {
      this.setResult({
        ...this.currentValue,
        original: data,
        name,
        ...this.extraxtMetadata(exifData),
      });
    } else {
      const { width, height } = await getDimensions(file);
      const thumbnail = await resizeImage(data);

      this.setResult({
        ...this.currentValue,
        thumbnail,
        width,
        height,
        data,
      });
    }
  }

  private extraxtMetadata(exifData: any): Partial<StableImage> {
    let parameters = exifData.parameters;
    if (!parameters) {
      parameters = new TextDecoder('utf-16be').decode(exifData.userComment);
    }

    if (!parameters) {
      return {};
    }

    const parts = parameters.split('\n');

    const positivePrompt = parts[0].replace('啎䥃佄䔀', '');
    const negativePrompt = parts[1].replace('Negative prompt: ', '');

    const generationData = parts[2].split(', ');
    const steps = Number(this.findAndReplace(generationData, 'Steps: '));
    const sampler = this.findAndReplace(generationData, 'Sampler: ');
    const cfg = Number(this.findAndReplace(generationData, 'CFG scale: '));
    const seed = Number(this.findAndReplace(generationData, 'Seed: '));
    const model = this.findAndReplace(generationData, 'Model: ');

    return {
      positivePrompt,
      negativePrompt,
      steps,
      sampler,
      cfg,
      seed,
      model,
    };
  }

  private findAndReplace(values: string[], searchStr: string): string {
    const foundElement = values.find((value: string) =>
      value.includes(searchStr)
    );

    return foundElement?.replace(searchStr, '') ?? '';
  }

  private handleDragEnd(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.dragTimer = null;
  }

  private handleDragStart(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.dragTimer !== null) {
      clearTimeout(this.dragTimer);
    }
    this.dragTimer = setTimeout(() => {
      this.dragTimer = null;
    }, 500);
  }

  private readFile(file: File): void {
    if (!file.type.includes('image')) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result?.toString() ?? '';

      this.addImage(file, data);
    };
  }

  private readMultipleFiles(files: FileList): void {
    for (let index = 0; index < files.length; index++) {
      this.readFile(files[index]);
    }

    this.inputRef.nativeElement.value = '';
  }

  private setResult(result: StableImage): void {
    if (result) {
      this.currentValue = result;

      this._onChange(result);
      this._onTouched();
    }
  }
}
