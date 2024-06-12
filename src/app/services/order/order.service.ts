import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = 'http://localhost:8080/pedidos';

  private readonly _http = inject(HttpClient);

  createOrder(orderData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    return this._http.post(`${this.API_URL}`, orderData,);
  }
}
