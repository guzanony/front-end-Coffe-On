import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/carrinho/carrinho.service';
import { ProductService } from '../../services/produtos/product.service';

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
  public products: Array<Product> = new Array<Product>();
  public cartId!: number;

  private readonly _router = inject(Router);
  private readonly _cartService = inject(CartService);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    this.getNameForExhibition();
    this.getProducts();
    this.initializeCart();
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

  private getNameForExhibition(): void {
    this.name = sessionStorage.getItem('nomeCompleto');
  }

  private getNameForCart(): string {
    return sessionStorage.getItem('nomeCompleto') || 'defaultUserId';
  }

  public isAuthenticated(): boolean {
    return !!sessionStorage.getItem('nomeCompleto');
  }

  public logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('nomeCompleto');
    sessionStorage.removeItem('cartId');
    this._router.navigate(['/customer']);
  }

  public navigateLogin(): void {
    this._router.navigate(['/login']);
  }

  public navigateSingUp(): void {
    this._router.navigate(['/singnup']);
  }

  public navigateProductDetail(id: number): void {
    this._router.navigate(['/product-details', id]);
  }

  private updateCartCount(): void {
    this._cartService.getCart(this.cartId).subscribe({
      next: (cart) => {
        console.log('Cart retrieved:', cart);

        if (cart.items && cart.items.length > 0) {
          this.cartItemCount = cart.items.reduce((sum: number, item: any) => {
            const quantity = item.quantity || 0;
            return sum + quantity;
          }, 0);
        } else {
          this.cartItemCount = 0;
        }

        console.log('Cart count updated:', this.cartItemCount);
      },
      error: (error) => {
        console.error('Erro ao carregar o carrinho:', error);
        this.cartItemCount = 0; // Define como 0 em caso de erro
      }
    });
  }



  public addToCart(product: Product): void {
    const cartItem = { productId: product.id, userName: this.getNameForCart(), quantity: 1 };
    console.log('Adding to cart:', cartItem);
    this._cartService.addItemToCart(this.cartId, product.id, 1).subscribe({
      next: (resp) => {
        console.log('Product added to cart successfully', resp);
        this.updateCartCount();
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }

  private initializeCart(): void {
    const cartId = sessionStorage.getItem('cartId');
    console.log('Cart ID from session:', cartId);
    if (cartId) {
      this.cartId = parseInt(cartId, 10);
      this.updateCartCount();
    } else {
      this._cartService.createCart().subscribe({
        next: (cart) => {
          console.log('New cart created:', cart);
          this.cartId = cart.id;
          sessionStorage.setItem('cartId', cart.id.toString());
          this.updateCartCount();
        },
        error: (error) => console.error('Error creating cart:', error)
      });
    }
  }


  public editProfile(): void {
    this._router.navigate(['/edit-user']);
  }

  public carrinho(): void {
    this._router.navigate(['/cart']);
  }

  public navigateToOrders(): void {
    this._router.navigate(['/orders-list']);
  }
}
