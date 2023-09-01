import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SortingDirection } from '@app/models';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
  faTags,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { emptyFilter, Filter } from './filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<T> implements OnInit {
  readonly favIcon: IconProp = faThumbTack;
  readonly allTagsIcon: IconProp = faTags;

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
      this.activeTags = value.tags.reduce(
        (currentMap: Record<string, boolean>, currentTag: string) => {
          return { ...currentMap, [currentTag]: true };
        },
        {}
      );
    }
  }
  private _tags: string[] = [];
  @Input() set tags(tags: string[]) {
    this._tags = tags;
  }
  get tags(): string[] {
    if (this.showAllTags) {
      return this._tags;
    } else {
      return this._tags.filter(
        (tag: string) => !!this.favoriteTags[tag] || !!this.activeTags[tag]
      );
    }
  }
  @Output() update: EventEmitter<Filter> = new EventEmitter();

  get sortLabel(): string {
    if (this.currentValue.sort === SortingDirection.ASC) {
      return 'Älteste zuerst';
    } else {
      return 'Neueste zuerst';
    }
  }

  activeTags: Record<string, boolean> = {};
  currentValue: Filter = emptyFilter;

  favoriteTags: Record<string, boolean> = {};
  showAllTags = false;
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

  ngOnInit(): void {
    this.favoriteTags = this.retrieveFavs();
  }

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

  onShowAllTags(): void {
    this.showAllTags = !this.showAllTags;
    this.cdRef.detectChanges();
  }

  onToggleTag(tag: string): void {
    if (this.activeTags[tag]) {
      this.currentValue.tags = this.currentValue.tags.filter(
        (item: string) => item !== tag
      );
    } else {
      this.currentValue.tags.push(tag);
    }

    this.onChange();
  }

  onUpdateFavTags(tag: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.favoriteTags = {
      ...this.favoriteTags,
      [tag]: !this.favoriteTags[tag],
    };
    this.storeFavs();
  }

  private storeFavs(): void {
    const serializedState = JSON.stringify(this.favoriteTags);

    localStorage.setItem(this.storageKey, serializedState);
  }

  private retrieveFavs(): Record<string, boolean> {
    const serializedState = localStorage.getItem(this.storageKey);

    if (serializedState) {
      const parsed: Record<string, boolean> = JSON.parse(serializedState);

      return parsed;
    } else {
      return {};
    }
  }
}
