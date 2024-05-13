import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'dash-pagination',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);
  @Input({ required: true, transform: numberAttribute }) pageSize: number = 0;
  @Input({ required: true, transform: numberAttribute }) totalPages: number = 0;
  @Input({ required: true, transform: numberAttribute }) totalCount: number = 0;
  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  currentPage: number = 1;
  pages: number[] = [];
  pagesNumber!: number;
  maxPages = 5;
  elementsOnEachSide: number = Math.floor(this.maxPages / 2);
  protected readonly Math = Math;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['totalPages']) {
      return;
    }
    this.initializePageArrayAndButtons();
    if (this.currentPage > this.pagesNumber) {
      this.currentPage = this.pagesNumber;
      this.pageNumberChange.emit(this.currentPage);
    }
  }

  onPageNumberClicked(page: number): void {
    this.currentPage = page;
    this.pageNumberChange.emit(this.currentPage);
    this.pages = this.rebuildPagesArray();
    this.cdr.detectChanges();
  }

  onFirst(): void {
    this.currentPage = 1;
    this.pageNumberChange.next(this.currentPage);
    this.pages = this.buildPagesArray(this.pagesNumber);
  }

  onLast(): void {
    this.currentPage = this.totalPages;
    this.pageNumberChange.next(this.currentPage);
    this.changePagesArrayOnLastClicked();
  }

  onNext(): void {
    if (this.currentPage !== this.totalPages) this.currentPage = this.currentPage + 1;
    this.pageNumberChange.emit(this.currentPage);
    this.pages = this.rebuildPagesArray();
  }

  onPrevious(): void {
    if (this.currentPage !== 1) this.currentPage = this.currentPage - 1;
    this.pageNumberChange.next(this.currentPage);
    this.pages = this.rebuildPagesArray();
  }

  pagesIdentifier(index: number) {
    return index;
  }

  private rebuildPagesArray() {
    if (this.totalPages <= this.maxPages) return this.pages;

    const numberElementsAside = this.maxPages - this.elementsOnEachSide;

    if (numberElementsAside <= this.currentPage && this.currentPage <= this.totalPages - numberElementsAside) {
      return this.buildDynamicBorder();
    }

    if (this.currentPage > this.totalPages - this.maxPages && this.currentPage !== this.totalPages + 1) {
      return this.buildLastPagesArray();
    }

    return this.buildPagesArray(this.pagesNumber);
  }

  private buildDynamicBorder() {
    const dynamicArray = [];
    for (let i = this.currentPage - this.elementsOnEachSide; i <= this.currentPage + this.elementsOnEachSide; i++) {
      dynamicArray.push(i);
    }
    return dynamicArray;
  }

  private changePagesArrayOnLastClicked() {
    if (this.currentPage < this.maxPages) return;
    this.pages = this.buildLastPagesArray();
  }

  private buildLastPagesArray(): number[] {
    return this.buildPagesArray(this.totalPages).slice(this.totalPages - this.maxPages);
  }

  private buildPagesArray(maxPages: number): number[] {
    return [...Array(maxPages).keys()].map((x) => ++x);
  }

  private initializePageArrayAndButtons(): void {
    this.pagesNumber = this.totalPages < this.maxPages ? this.totalPages : this.maxPages;
    this.pages = this.buildPagesArray(this.pagesNumber);
  }
}
