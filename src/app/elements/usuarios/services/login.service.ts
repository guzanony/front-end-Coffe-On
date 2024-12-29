import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserResponse } from '../model/login-user-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  public urlApi: string = 'http://localhost:8080/auth/login';

  constructor(private readonly _httpClient: HttpClient) { }

  public postLoginUser(username: string | null | undefined, password: string | null | undefined): Observable<LoginUserResponse> {
    const payload = { username, password };
    return this._httpClient.post<LoginUserResponse>(this.urlApi, payload);
  }
}
