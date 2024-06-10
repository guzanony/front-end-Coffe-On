import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/carrinho/cart.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface ShippingOption {
  description: string;
  cost: number;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: any = {};
  public shippingCost: number = 0;
  public shippingOptions: ShippingOption[] = [];
  public cep: string = '';

  private readonly _cartService = inject(CartService);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    const cartId = parseInt(sessionStorage.getItem('cartId')!, 10);
    if (cartId) {
      this._cartService.getCart(cartId).subscribe(data => {
        this.cart = data;
        this.calculateSubtotal();
        this.cart.items.forEach((item: any) => {
          this._productService.getProductImageUrl(item.product.id).subscribe(blob => {
            const objectUrl = URL.createObjectURL(blob);
            item.product.imagemUrl = objectUrl;
          });
        });
      });
    }
  }

  public updateQuantity(itemId: number, quantity: number): void {
    const cartId = this.cart.id;
    if (quantity < 1) {
      quantity = 1;
    }
    this._cartService.updateItemInCart(cartId, itemId, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  public removeItem(itemId: number): void {
    const cartId = this.cart.id;
    this._cartService.removeItemFromCart(cartId, itemId).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }
    });
  }

  public calculateSubtotal(): number {
    let subtotal = 0;
    if (this.cart.items) {
      this.cart.items.forEach((item: any) => {
        subtotal += item.product.preco * item.quantity;
      });
    }
    return subtotal;
  }

  public calculateShipping(): void {
    this.shippingOptions = [
      { description: 'Entrega Econômica', cost: 29.25 },
      { description: 'Entrega Expressa', cost: 44.60 },
      { description: 'Entrega Agendada', cost: 29.25 }
    ];
  }

  public calculateTotal(): number {
    return this.calculateSubtotal() + this.shippingCost;
  }
}
