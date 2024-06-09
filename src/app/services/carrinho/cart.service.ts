import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/carts';

  private readonly _http = inject(HttpClient);

  public createCart(): Observable<any> {
    return this._http.post(`${this.baseUrl}`, {});
  }

  public getCart(cartId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/${cartId}`);
  }

  public addItemToCart(cartId: number, productId: number, quantity: number): Observable<any> {
    return this._http.post(`${this.baseUrl}/${cartId}/items`, { productId, quantity });
  }

  public updateItemInCart(cartId: number, itemId: number, quantity: number): Observable<any> {
    return this._http.put(`${this.baseUrl}/${cartId}/items/${itemId}`, { quantity });
  }

  public removeItemFromCart(cartId: number, itemId: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${cartId}/items/${itemId}`);
  }

  public getItemCount(cartId: number): Observable<number> {
    return this._http.get<number>(`${this.baseUrl}/${cartId}/count`);
  }
}
