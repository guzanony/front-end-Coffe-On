import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/auth/cliente';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/me`);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/me`, data);
  }
}
