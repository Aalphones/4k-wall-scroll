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
import { createEmptyStableImage, StableImage } from '@app/models';
import { getExtensionFromName, resizeImage } from '@app/utils';
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

  @Input() control: FormControl = new FormControl(null);

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
      this.inputRef.nativeElement.value = '';
    } else if (files && files?.length >= 1) {
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

  currentValue: StableImage[] | null = null;

  @HostBinding('class.fileInput--draggedOver') private isDragging = false;
  private multiUploadList: StableImage[] = [];

  constructor() {}

  _onChange: (_: StableImage[] | null) => void = () => {};
  _onTouched: () => void = () => {};

  onChange(nextValue: StableImage[] | null): void {
    this._onChange(nextValue);
    this.control.setValue(nextValue);

    this._onTouched();
  }

  onFileChange(): void {
    const files: FileList = this.inputRef.nativeElement.files!;

    this.readMultipleFiles(files);
  }

  writeValue(value: StableImage[] | null): void {
    this.currentValue = value ?? null;
  }

  registerOnChange(fn: (_: StableImage[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  private async addImage(file: File, data: string): Promise<void> {
    const extension = getExtensionFromName(file.name);
    const name = file.name.replace(extension, '');

    const exifData = await exifr.parse(file);
    const thumbnail = await resizeImage(data);
    this.setResult({
      ...createEmptyStableImage(),
      data,
      thumbnail,
      name,
      width: exifData?.ImageWidth ?? 0,
      height: exifData?.ImageHeight ?? 0,
      ...this.extraxtMetadata(exifData?.parameters),
    });
  }

  private extraxtMetadata(parameters: string): Partial<StableImage> {
    if (!parameters) {
      return {};
    }

    const parts = parameters.split('\n');

    const positivePrompt = parts[0];
    const negativePrompt = parts[1].replace('Negative prompt: ', '');

    const generationData = parts[2].split(', ');
    const steps = Number(generationData[0].replace('Steps: ', ''));
    const sampler = generationData[1].replace('Sampler: ', '');
    const cfg = Number(generationData[2].replace('CFG scale: ', ''));
    const seed = Number(generationData[3].replace('Seed: ', ''));
    const model = generationData[6].replace('Model: ', '');

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
    this.multiUploadList = [];

    for (let index = 0; index < files.length; index++) {
      this.readFile(files[index]);
    }

    this.inputRef.nativeElement.value = '';
  }

  private setResult(result: StableImage): void {
    if (result) {
      this.multiUploadList.push(result);
      this.onChange(this.multiUploadList);
    }
  }
}
