import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBackward,
  faChevronLeft,
  faChevronRight,
  faForward,
  faImages,
  faTableList,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges, OnInit, OnDestroy {
  readonly nextIcon: IconProp = faChevronRight;
  readonly prevIcon: IconProp = faChevronLeft;
  readonly firstIcon: IconProp = faBackward;
  readonly lastIcon: IconProp = faForward;
  readonly tableIcon: IconProp = faTableList;
  readonly imageIcon: IconProp = faImages;

  @Input() currentPage: number = 0;
  @Input() itemCount: number = 100;
  @Input() pageSize: number = 23;

  @Output() switchPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() switchPageSize: EventEmitter<number> = new EventEmitter<number>();

  pageSizeSelect: FormControl = new FormControl(23);
  pageSizeOptions: number[] = [12, 24, 48, 0];

  lastPage: number = 0;
  nextDisabled = false;
  previousDisabled = true;

  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.pageSizeSelect.setValue(this.pageSize);
    this.pageSizeSelect.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: string) => {
        this.switchPageSize.emit(Number(value));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(): void {
    this.lastPage = Math.ceil(this.itemCount / this.pageSize) - 1;
    this.nextDisabled = this.currentPage === this.lastPage;
    this.previousDisabled = this.currentPage === 0;

    if (this.pageSizeSelect.value !== this.pageSize) {
      this.pageSizeSelect.setValue(this.pageSize);
    }
  }

  first(): void {
    this.switchPage.emit(0);
  }

  last(): void {
    this.switchPage.emit(this.lastPage);
  }

  next(): void {
    const nextIndex: number = this.currentPage + 1;

    if (nextIndex <= this.lastPage) {
      this.switchPage.emit(nextIndex);
    }
  }

  previous(): void {
    const nextIndex: number = this.currentPage - 1;

    if (nextIndex >= 0) {
      this.switchPage.emit(nextIndex);
    }
  }

  @HostListener('window:keyup', ['$event'])
  private listenForKeyboard(event: KeyboardEvent): void {
    if (event.shiftKey && event.key === 'ArrowLeft') {
      this.first();
    } else if (event.shiftKey && event.key === 'ArrowRight') {
      this.last();
    } else if (event.ctrlKey && event.key === 'ArrowLeft') {
      this.previous();
    } else if (event.ctrlKey && event.key === 'ArrowRight') {
      this.next();
    }
  }
}
