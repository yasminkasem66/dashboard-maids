import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'dash-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() inputClasses: string = '';
  @Input() searchValue: string = '';
  @Input() isDisabled: boolean = false;
  @Input() appliedClasses: string = '';
  @Input() placeholder = '';
  @Input({ transform: booleanAttribute }) debounceTime: number = 3000;
  @Output() searchValueChange = new EventEmitter<string>();
  private debouncer: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.debouncer.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe((value: string) => {
      this.searchValueChange.emit(value);
    });
  }

  onSearchValueChange($event: Event): void {
    const value = ($event.target as HTMLInputElement).value;
    this.debouncer.next(value);
  }
}
