import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../modal/iemployee';
import { AsyncPipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ITableHeaders } from '../../../../shared/models/itable-headers';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { ActionType } from '../../enums/action-type';

@Component({
  selector: 'dash-employee-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe, JsonPipe, NgIf, SearchComponent, NoDataFoundComponent, AddEditEmployeeComponent],
  providers: [SlicePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  protected route = inject(ActivatedRoute);
  private slicePipe = inject(SlicePipe);
  protected router = inject(Router);

  employee!: IEmployee;
  protected pageNumber = 1;
  protected pageSize: number = 5;
  protected searchTerm: string = '';
  actionType: typeof ActionType = ActionType;

  employees!: IEmployee[];
  paginatedData!: IEmployee[];

  headers: ITableHeaders[] = [
    {
      value: 'name',
      name: 'Name',
    },
    {
      value: 'deductions',
      name: 'Deductions',
    },
    {
      value: 'salary',
      name: 'Salary',
    },
  ];

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'pi-info-circle',
      iconClasses: ' cursor-pointer',
      callback: (employee: IEmployee) => {
        this.router.navigate([`employee-details/${employee._id}`]);
      },
    },
    {
      name: 'Edit',
      label: 'Edit',
      icon: 'pi-pen-to-square',
      iconClasses: 'cursor-pointer',
      // eslint-disable-next-line
      callback: (item) => {
        this.openEditModal = true;
        this.employee = item;
      },
    },
    {
      name: 'Delete',
      label: 'Delete',
      icon: 'pi-trash',
      iconClasses: ' cursor-pointer',
      callback: (item: IEmployee) => {
        this.employee = item;
        this.openAddModal = true;

        this.deleteEmployee(item._id);
      },
    },
  ];

  openEditModal: boolean = false;
  openAddModal: boolean = false;

  ngOnInit(): void {
    this.getEmployees();
    this.setSearchTermOnInit();
  }

  getEmployees() {
    this.employeeService.getListOfEmployees().subscribe({
      next: (users) => {
        this.employees = users.data;
        this.pageNumber = 1;
        this.pageNumberChange(this.pageNumber);
        this.filteredItems(this.searchTerm);
      },
    });
  }

  protected setSearchTermOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
    });
  }

  protected sortedItems(sortTerm: string) {
    if (sortTerm === 'asc') {
      this.employees = this.employees.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortTerm === 'desc') {
      this.employees = this.employees.slice().sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    this.pageNumberChange(1);
  }

  protected filteredItems(searchTerm: string) {
    this.router.navigate(['/employee'], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });
    this.paginatedData = this.employees.filter((item) => item.name.toLowerCase().includes(searchTerm));
    this.pageNumber = 1;
    this.paginatedData = this.getPage(this.paginatedData);
  }

  pageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.paginatedData = this.getPage(this.employees);
  }

  protected getPage(data: any[]) {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, data.length);
    const paginatedData = data.slice(startIndex, endIndex);
    return paginatedData;
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployees();
    });
  }
  addEmployee(item: IEmployee) {
    this.employeeService.createEmployee(item).subscribe(() => this.getEmployees());
  }

  editEMployee(item: IEmployee) {
    this.employeeService.editEmployee(this.employee._id, item).subscribe(() => this.getEmployees());
  }
}
