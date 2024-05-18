import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe, JsonPipe, NgIf, SlicePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IActionTable } from '../../../../shared/models/iactiont-table';
import { IPaginationResponse } from '../../../../shared/models/ipagination-response';
import { ActionType } from '../../enums/action-type';
import { IUser } from '../../modals/iuser';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'dash-list-of-users',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    JsonPipe,
    NgIf,
    SearchComponent,
    NoDataFoundComponent,
    AddEditUserComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent,
  ],
  providers: [SlicePipe],
  templateUrl: './list-of-users.component.html',
  styleUrl: './list-of-users.component.scss',
})
export class ListOfUsersComponent {
  private userService = inject(UserService);
  protected route = inject(ActivatedRoute);
  private slicePipe = inject(SlicePipe);
  protected router = inject(Router);

  user!: IUser;
  protected pageNumber = 1;
  protected pageSize: number = 6;
  protected searchTerm: string = '';
  actionType: typeof ActionType = ActionType;

  protected Math = Math;

  data!: IPaginationResponse<IUser[]>;
  originalUsers: IUser[] = [];
  users: IUser[] = [];
  paginatedData!: IUser[];

  actions: IActionTable[] = [
    {
      name: 'See more',
      label: 'See more',
      icon: 'pi-info-circle',
      iconClasses: ' cursor-pointer',
      callback: (user: IUser) => {
        this.router.navigate([`user-details/${user.id}`]);
      },
    },
    {
      name: 'Edit',
      label: 'Edit',
      icon: 'pi-pen-to-square',
      iconClasses: 'cursor-pointer',
      callback: (item) => {
        this.openEditModal = true;
        this.user = item;
      },
    },
    {
      name: 'Delete',
      label: 'Delete',
      icon: 'pi-trash',
      iconClasses: ' cursor-pointer',
      callback: (item: IUser) => {
        this.user = item;
        this.openConfirmDelete = true;
      },
    },
  ];

  openEditModal: boolean = false;
  openAddModal: boolean = false;
  openConfirmDelete: boolean = false;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getListOfPaginatedUsers(this.pageNumber).subscribe({
      next: (users) => {
        this.users = users.data;
        this.originalUsers = users.data;
        this.data = users;
      },
    });
  }

  protected sortedItems(sortTerm: string) {
    if (sortTerm === 'asc') {
      this.users = this.users.slice().sort((a, b) => {
        return a.first_name.localeCompare(b.first_name);
      });
    } else if (sortTerm === 'desc') {
      this.users = this.users.slice().sort((a, b) => {
        return b.first_name.localeCompare(a.first_name);
      });
    }
  }

  protected filteredItems(searchTerm: string) {
    this.router.navigate(['/users'], {
      relativeTo: this.route,
      queryParams: { searchTerm: searchTerm },
      queryParamsHandling: 'merge',
    });

    this.users = this.originalUsers.filter((user) => user.first_name.toLowerCase().includes(searchTerm));
  }

  pageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUsers();
  }

  deleteUser() {
    this.openConfirmDelete = false;
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== this.user.id);
    });
  }

  addUser(item: IUser) {
    this.userService.createUser(item).subscribe(() => {
      this.users.unshift(item);
      this.data.total = this.data.total + 1;
      this.pageSize = this.pageSize + 1;
    });
  }

  editUser(item: IUser) {
    this.userService.editUser(this.user.id, item).subscribe(() => {
      const userIndex = this.users.findIndex((user) => user.id == item.id);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...item };
      }
    });
  }
}
