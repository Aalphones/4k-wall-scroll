import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true,
    },
  ],
})
export class TagInputComponent implements ControlValueAccessor {
  readonly deleteIcon: IconProp = faX;

  @ViewChild('input')
  inputRef!: ElementRef<HTMLInputElement>;

  @Input() control: FormControl = new FormControl([]);
  @Input() placeholder: string = 'Tags hinzufügen...';

  private _options: string[] | null = null;
  @Input() set options(options: string[] | null) {
    this._options = options;
  }
  get options(): string[] | null {
    if (this._options !== null) {
      return this._options.filter(
        (option: string) => !this.currentValue.includes(option)
      );
    } else {
      return this._options;
    }
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.inputRef.nativeElement.focus();
  }

  currentValue: string[] = [];
  inputValue: string = '';

  constructor() {}

  _onChange: (_: string[] | null) => void = () => {};
  _onTouched: () => void = () => {};

  onChange(nextValue: string[] | null): void {
    if (nextValue) {
      const cleansed = nextValue.filter((value: string) => !!value);
      this._onChange(cleansed);
      this.control.setValue(cleansed);
    } else {
      this._onChange(nextValue);
      this.control.setValue(nextValue);
    }

    this._onTouched();
  }

  onDeleteTag(index: number, event: MouseEvent): void {
    event.stopImmediatePropagation();

    this.currentValue = this.currentValue.filter(
      (_tag: string, tagIndex: number) => tagIndex !== index
    );

    this.onChange(this.currentValue);
  }

  onInputEnter(): void {
    const tagExists = this.currentValue.includes(this.inputValue);

    if (!tagExists) {
      const updated: string[] = [
        ...this.currentValue,
        this.inputValue.toLocaleLowerCase(),
      ];
      this.currentValue = updated;
      this.onChange(updated);
    }

    this.inputValue = '';
  }

  onInputPaste(event: ClipboardEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const clipboardText: string | undefined =
      event.clipboardData?.getData('Text');

    if (clipboardText) {
      const newValues: string[] = this.processPastedText(clipboardText);

      const updated: string[] = [...this.currentValue, ...newValues];
      const removedDuplicates = [...new Set(updated)];

      this.onChange(removedDuplicates);
    }
  }

  onTagClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  writeValue(value: string[] | null): void {
    this.currentValue = value ?? [];
  }

  registerOnChange(fn: (_: string[] | null) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  private processPastedText(text: string): string[] {
    const isSeparatedByNewLine = text.includes('\n');
    const isSeparatedByComma = text.includes(',');
    const splitted = [];

    if (isSeparatedByNewLine) {
      splitted.push(...text.split('\n'));
    } else if (isSeparatedByComma) {
      splitted.push(...text.split(', '));
    }

    return splitted.map((value: string) =>
      value.replace('\r', '').toLocaleLowerCase()
    );
  }
}
