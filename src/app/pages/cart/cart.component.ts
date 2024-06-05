import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private readonly router = inject(Router)

  cartItems: CartItem[] = [];
  cep: string = '';
  selectedFreteOption: string = '';
  freteOptions: string[] = ['Correios', 'Sedex', 'FedEx'];
  subtotal: number = 0;
  freteValor: number = 0;
  total: number = 0;

  addProduct(productName: string, productPrice: number) {
    const newItem: CartItem = {
      name: productName,
      price: productPrice,
      quantity: 1,
      image: 'placeholder.jpg'
    };
    this.cartItems.push(newItem);
    this.updateSubtotal();
  }

  removeProduct(item: CartItem) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateSubtotal();
    }
  }

  incrementQuantity(item: CartItem) {
    item.quantity += 1;
    this.updateSubtotal();
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateSubtotal();
    }
  }

  updateSubtotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.freteValor = this.subtotal > 100 ? 0 : 10;
    this.total = this.subtotal + this.freteValor;
  }

  calcularFrete() {
    this.updateSubtotal();
  }

  public goToPagamentos() {
    this.router.navigate(['/pagamentos'])
  }
}
