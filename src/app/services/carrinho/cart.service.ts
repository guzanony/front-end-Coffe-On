import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  private readonly API_URL = 'http://localhost:8080/api/cart';

  private readonly _http = inject(HttpClient);

  public getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  public addToCart(userId: string, productId: string, quantity: number = 1): void {
    const cartItem = { userId, productId, quantity };
    console.log('Sending request to add to cart:', cartItem); // Log de depuração
    this._http.post(`${this.API_URL}/add`, cartItem).subscribe((response: any) => {
      console.log('Cart response:', response); // Adicione log para depuração
      if (response && response.items) {
        this.cartItemCount.next(response.items.length);
      } else {
        console.error('Invalid cart response:', response);
      }
    }, error => {
      console.error('Error adding to cart:', error);
    });
  }

  public loadCart(userId: string): void {
    console.log('Sending request to load cart for userId:', userId); // Log de depuração
    this._http.get(`${this.API_URL}?userId=${userId}`).subscribe((response: any) => {
      console.log('Load cart response:', response); // Adicione log para depuração
      if (response && response.items) {
        this.cartItemCount.next(response.items.length);
      } else {
        console.error('Invalid load cart response:', response);
      }
    }, error => {
      console.error('Error loading cart:', error);
    });
  }
}
