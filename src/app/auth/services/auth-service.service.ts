import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, ServicesUrls } from '../../@Core/services/api-urls/api-urls';
import { ILoginRequest } from '../models/ilogin-request';
import { ILoginResponse } from '../models/ilogin-response';
import { ISignup } from '../models/isignup';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  login(user: ILoginRequest): Observable<ILoginResponse> {
    const ApiUrl = `${API_URL}${ServicesUrls.LOGIN}`;
    return this.httpClient.post<ILoginResponse>(ApiUrl, user);
  }

  signup(user: ISignup): Observable<ILoginResponse> {
    const ApiUrl = `${API_URL}${ServicesUrls.SIGN_UP}`;
    return this.httpClient.post<ILoginResponse>(ApiUrl, user);
  }
}
