import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITableHeaders } from '../../models/itable-headers';
import { IActionTable } from '../../models/iactiont-table';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'dash-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input({ required: true }) tableData!: { [key: string | number]: any }[];
  @Input({ required: true }) headers!: ITableHeaders[];
  @Input() showPagination: boolean = true;
  @Input() alignRight: boolean = false;
  @Input() customClass: string = '';
  @Input() actions?: IActionTable[];
  @Input() totalCount!: number;
  @Input() pageSize: number = 5;

  @Output() pageNumberChange: EventEmitter<number> = new EventEmitter<number>();
  protected readonly Math = Math;

  getRowValueFromHeader(header: ITableHeaders, item: any) {
    if (header.renderedValue) return header.renderedValue(item[header.value]);
    return item[header.value];
  }
}
