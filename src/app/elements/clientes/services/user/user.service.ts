import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'http://localhost:8080/auth/cliente';

  private readonly _http = inject(HttpClient);

  public getUser(): Observable<any> {
    return this._http.get(`${this.baseUrl}/me`);
  }

  public updateUser(data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/me`, data);
  }
}
