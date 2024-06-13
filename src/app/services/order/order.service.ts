import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API_URL = 'http://localhost:8080/pedidos';

  private readonly _http = inject(HttpClient);

  public createOrder(orderData: any): Observable<any> {
    return this._http.post(`${this.API_URL}`, orderData,);
  }

 public getOrdersByClienteId(clienteId: number): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/cliente/${clienteId}`);
  }

  public getOrder(orderId: number): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/${orderId}/detalhes`);
  }
}
