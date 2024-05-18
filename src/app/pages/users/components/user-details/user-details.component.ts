import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../shared/models/iresponse';
import { IUser } from '../../modals/iuser';
import { NgIf, AsyncPipe, JsonPipe } from '@angular/common';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';

@Component({
  selector: 'dash-user-details',
  standalone: true,
  imports: [RouterModule, CardComponent, NgIf, NoDataFoundComponent, BackButtonComponent, AsyncPipe, JsonPipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  private userService = inject(UserService);
  private _route = inject(ActivatedRoute);
  id!: string;
  user$!: Observable<IResponse<IUser>>;

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.user$ = this.userService.getUserById(this.id);
  }
}
