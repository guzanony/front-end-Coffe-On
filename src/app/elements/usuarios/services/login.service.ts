import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserResponse } from '../../clientes/types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  public urlApi: string = 'http://localhost:8080/auth/login';

  constructor(private readonly _httpClient: HttpClient) { }

  public postLoginUser(username: string | null | undefined, password: string | null | undefined): Observable<LoginUserResponse> {
    return this._httpClient.post<LoginUserResponse>(this.urlApi, { username, password });
  }
}
