import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { IEmployee } from '../../modal/iemployee';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { IResponse } from '../../../../shared/models/iresponse';

@Component({
  selector: 'dash-employee-details',
  standalone: true,
  imports: [RouterModule, CardComponent, NgIf, NoDataFoundComponent, BackButtonComponent, AsyncPipe, JsonPipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
  private employeeService = inject(EmployeeService);
  private _route = inject(ActivatedRoute);
  id!: string;
  employee$!: Observable<IResponse<IEmployee>>;

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.employee$ = this.employeeService.getEmployeeById(this.id);
  }
}
