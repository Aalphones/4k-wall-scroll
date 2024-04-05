import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { emptyFilter, Filter, SortingDirection } from './filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  readonly favIcon: IconProp = faThumbTack;

  @Input() sortLabel = 'Nach Name';
  @Input() set sortType(type: 'abc' | 'number') {
    switch (type) {
      case 'number':
        this.sortAscIcon = faSortNumericDown;
        this.sortDescIcon = faSortNumericUp;
        break;
      default:
        this.sortAscIcon = faSortAlphaDown;
        this.sortDescIcon = faSortAlphaUp;
        break;
    }
  }
  @Input() storageKey = 'filter';

  @Input() set value(value: Filter | null) {
    if (value) {
      this.currentValue = value;
    }
  }
  @Output() update: EventEmitter<Filter> = new EventEmitter();

  currentValue: Filter = emptyFilter;

  sortAscIcon: IconProp = faSortAlphaDown;
  sortDescIcon: IconProp = faSortAlphaUp;

  get sortingIcon(): IconProp {
    if (this.currentValue.sort === SortingDirection.ASC) {
      return this.sortAscIcon;
    } else {
      return this.sortDescIcon;
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  onChange(): void {
    this.update.emit(this.currentValue);
  }

  onChangeSorting(): void {
    const nextValue: SortingDirection =
      this.currentValue.sort === SortingDirection.ASC
        ? SortingDirection.DESC
        : SortingDirection.ASC;

    this.currentValue.sort = nextValue;
    this.onChange();
  }

  onResetText(): void {
    this.currentValue.searchText = '';
    this.onChange();
  }
}
