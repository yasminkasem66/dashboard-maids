import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../modal/iemployee';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';
import { IResponse } from '../../../shared/models/iresponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private httpClient = inject(HttpClient);

  getListOfEmployees(): Observable<IResponse<IEmployee[]>> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_EMPLOYEES}`;
    return this.httpClient.get<IResponse<IEmployee[]>>(ApiUrl);
  }

  getEmployeeById(id: string): Observable<IResponse<IEmployee>> {
    const ApiUrl = `${API_URL}${ServicesUrls.EMPLOYEE_BY_ID}${id}`;
    return this.httpClient.get<IResponse<IEmployee>>(ApiUrl);
  }

  deleteEmployee(id: string): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.DELETE_EMPLOYEE}${id}`;
    return this.httpClient.delete<null>(ApiUrl);
  }

  editEmployee(id: string, body: IEmployee): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.EDIT_EMPLOYEE}${id}`;
    return this.httpClient.post<null>(ApiUrl, body);
  }

  createEmployee(body: IEmployee): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.CREATE_EMPLOYEE}`;
    return this.httpClient.post<null>(ApiUrl, body);
  }
}
