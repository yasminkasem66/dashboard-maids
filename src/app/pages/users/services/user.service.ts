import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../../@Core/services/api-urls/api-urls';
import { IPaginationResponse } from '../../../shared/models/ipagination-response';
import { IResponse } from '../../../shared/models/iresponse';
import { IUser } from '../modals/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);

  getListOfUsers(): Observable<IResponse<IUser[]>> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_USERS}`;
    return this.httpClient.get<IResponse<IUser[]>>(ApiUrl);
  }

  getListOfPaginatedUsers(pageNumber: number): Observable<IPaginationResponse<IUser[]>> {
    const ApiUrl = `${API_URL}${ServicesUrls.LIST_OF_PAGINATED_USERS.replace('{page}', pageNumber.toString())}`;
    return this.httpClient.get<IPaginationResponse<IUser[]>>(ApiUrl);
  }

  getUserById(id: string): Observable<IResponse<IUser>> {
    const ApiUrl = `${API_URL}${ServicesUrls.USER_BY_ID}${id}`;
    return this.httpClient.get<IResponse<IUser>>(ApiUrl);
  }

  deleteUser(id: string): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.DELETE_USER}${id}`;
    return this.httpClient.delete<null>(ApiUrl);
  }

  editUser(id: string, body: IUser): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.EDIT_USER}${id}`;
    return this.httpClient.post<null>(ApiUrl, body);
  }

  createUser(body: IUser): Observable<null> {
    const ApiUrl = `${API_URL}${ServicesUrls.CREATE_USER}`;
    return this.httpClient.post<null>(ApiUrl, body);
  }
}
