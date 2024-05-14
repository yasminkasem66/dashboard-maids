import { Injectable, inject } from '@angular/core';
import { ILoginRequest } from '../models/ilogin-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISignup as ISignup } from '../models/isignup';
import { IResponse } from '../../shared/models/iresponse';
import { ILoginResponse } from '../models/ilogin-response';
import { API_URL, ServicesUrls } from '../../@Core/services/api-urls/api-urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(user: ILoginRequest): Observable<IResponse<ILoginResponse>> {
    const ApiUrl = `${API_URL}${ServicesUrls.LOGIN}`;
    return this.httpClient.post<IResponse<ILoginResponse>>(ApiUrl, user);
  }

  signup(user: ISignup): Observable<IResponse<ILoginResponse>> {
    const ApiUrl = `${API_URL}${ServicesUrls.SIGN_UP}`;
    return this.httpClient.post<IResponse<ILoginResponse>>(ApiUrl, user);
  }
}
