import { Address } from './../../models/singnup-form.model';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/carrinho/carrinho.service';
import { ProductService } from '../../services/produtos/product.service';
import { AddressService } from '../../services/enderecos/address.service';
import { AddAddressFormComponent } from '../../../../components/add-address-form/add-address-form.component';

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
  public addresses: Address[] = [];
  public selectedAddress: Address | undefined;
  public showAddAddressForm = false;
  public newAddress: Address = {
    id: 0,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: ''
  };

  private readonly _cartService = inject(CartService);
  private readonly _productService = inject(ProductService);
  private readonly _router = inject(Router);
  private readonly _addressService = inject(AddressService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCart();
    if (this.isAuthenticated()) {
      this.loadAddresses();
    }
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

  private loadAddresses(): void {
    const clienteId = parseInt(sessionStorage.getItem('clienteId')!, 10);
    if (clienteId) {
      this._addressService.getUserAddresses(clienteId).subscribe({
        next: (data) => {
          console.log('Endereço recebido:', data);
          this.addresses = data;
          if (this.addresses.length > 0) {
            this.selectedAddress = this.addresses[0];
          }
        },
        error: (error) => {
          console.error('Error ao pegar endereço:', error);
        }
      });
    }
  }

  private isAuthenticated(): boolean {
    return !!sessionStorage.getItem('nomeCompleto');
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

  public navigateToCheckout(): void {
    if (this.isAuthenticated()) {
      this._router.navigate(['/payment']);
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/payment');
      this._router.navigate(['/login']);
    }
  }

  public selectAddress(address: Address): void {
    this.selectedAddress = address;
  }

  public navigateToAddressSelection(): void {
    this._router.navigate(['/select-address']);
  }

  public openAddAddressForm(): void {
    const dialogRef = this.dialog.open(AddAddressFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addresses.push(result);
      }
    });
  }

  public logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('clienteId');
    sessionStorage.removeItem('cartId');
    sessionStorage.removeItem('redirectAfterLogin');
    this.addresses = [];
    this._router.navigate(['/login']);
  }
}
