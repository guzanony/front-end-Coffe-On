import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL_CLIENTE = 'http://localhost:8080/auth/cliente';

  private readonly _http = inject(HttpClient);

  public getUser(): Observable<any> {
    return this._http.get(`${this.API_URL_CLIENTE}/me`);
  }

  public updateUser(data: any): Observable<any> {
    return this._http.put(`${this.API_URL_CLIENTE}/me`, data);
  }
}
