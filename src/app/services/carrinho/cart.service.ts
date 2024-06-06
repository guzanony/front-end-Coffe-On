import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public addToCart(cartItem: CartItem): Observable<any> {
    console.log('Adding to cart:', cartItem);
    return this.http.post(`${this.apiUrl}/add`, cartItem, { headers: this.getAuthHeaders() });
  }

  public getCart(userName: string): Observable<any> {
    console.log('Getting cart for user:', userName);
    const params = new HttpParams().set('nomeCompleto', userName);
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders(), params });
  }
}
