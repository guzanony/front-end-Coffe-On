import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginUserResponse } from '../../clientes/types/login-response.type';
import { LoginUserModel } from '../model/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  public urlApi: string = 'http://localhost:8080/auth/login';

  constructor(private readonly _httpClient: HttpClient) { }

  public postLoginUser(username: string | null | undefined, password: string | null | undefined): Observable<LoginUserModel> {
    return this._httpClient.post<LoginUserModel>(this.urlApi, { username, password });
  }
}
