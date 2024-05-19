import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/carrinho/cart.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public name: string | null = '';
  public cartItemCount: number = 0;

  private readonly _router = inject(Router);
  private readonly _cartService = inject(CartService);

  ngOnInit(): void {
    this.name = sessionStorage.getItem('nomeCompleto');
    const userId = sessionStorage.getItem('userId') || '';
    this._cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
    if (userId) {
      this._cartService.loadCart(userId);
    }
  }

  public navigate(): void {
    this._router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }

  public logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('nomeCompleto');
    this._router.navigate(['']);
  }

  public navigateLogin(): void {
    this._router.navigate(['/login']);
  }

  public navigateSingUp(): void {
    this._router.navigate(['/singnup']);
  }

  public navigateProductDetail(): void {
    this._router.navigate(['/product-details']);
  }

  public addToCart(): void {
    const nomeCompleto = sessionStorage.getItem('nomeCompleto');
    if (nomeCompleto) {
      this.cartItemCount++;
    }
  }
}
