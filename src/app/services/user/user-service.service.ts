import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL_CLIENTE = 'http://localhost:8080/auth/cliente';
  private readonly API_URL_PRODUCT = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  public getUser(): Observable<any> {
    return this.http.get(`${this.API_URL_CLIENTE}/me`);
  }

  public updateUser(data: any): Observable<any> {
    return this.http.put(`${this.API_URL_CLIENTE}/me`, data);
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL_PRODUCT}`)
  }
}
