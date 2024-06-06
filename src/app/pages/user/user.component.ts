import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/carrinho/cart.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product-service.service';

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
  public idProduct: number = 1;
  public products = new Array<Product>();

  private readonly _router = inject(Router);
  private readonly _cartService = inject(CartService);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    this.name = sessionStorage.getItem('nomeCompleto');
    this.updateCartCount();
    this.getProducts();
  }

  public getProducts(): void {
    this._productService.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach(product => {
        this._productService.getProductImageUrl(product.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          product.imagemUrl = objectUrl;
        });
      });
    });
  }

  private getUserName(): string {
    return sessionStorage.getItem('nomeCompleto') || 'defaultUserId';
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

  public addToCart(product: Product): void {
    const cartItem = { productId: product.id, userName: this.getUserName(), quantity: 1 };
    console.log('Adding to cart:', cartItem);  // Log the cart item being sent
    this._cartService.addToCart(cartItem).subscribe({
        next: (resp) => {
            console.log('Product added to cart successfully', resp);
            this.updateCartCount();
        },
        error: (error) => {
            console.error('Error adding product to cart:', error);
        }
    });
}
  private updateCartCount(): void {
    this._cartService.getCart(this.getUserName()).subscribe({
      next: (cart) => {
        this.cartItemCount = cart.items.reduce((sum: any, item: any) => sum + item.quantity, 0);
      },
      error: (error) => console.error('Error updating cart count:', error)
    });
  }

  public editProfile(): void {
    this._router.navigate(['/edit-user']);
  }

  public carrinho(): void {
    this._router.navigate(['/cart']);
  }
}
