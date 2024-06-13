import { Component, OnInit, inject } from '@angular/core';
import { Address } from '../../models/singnup-form.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/carrinho/cart.service';
import { AddressService } from '../../services/enderecos/address-service.';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-sumary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-sumary.component.html',
  styleUrl: './order-sumary.component.scss'
})
export class OrderSummaryComponent implements OnInit {

  public cart: any = {};
  public selectedAddress: Address | null = null;
  public paymentMethod: string = '';
  public shippingCost: number = 0;

  private readonly _router = inject(Router);
  private readonly _cartService = inject(CartService);
  private readonly _addressService = inject(AddressService);
  private readonly _toastService = inject(ToastrService);
  private readonly _orderService = inject(OrderService);

  ngOnInit(): void {
    this.loadOrderSummary();
  }

  private loadOrderSummary(): void {
    const cartId = parseInt(sessionStorage.getItem('cartId')!, 10);
    const clienteId = parseInt(sessionStorage.getItem('clienteId')!, 10);
    const paymentMethod = sessionStorage.getItem('formaPagamento') || '';
    const shippingCost = parseFloat(sessionStorage.getItem('valorFrete') || '0');

    if (cartId) {
      this._cartService.getCart(cartId).subscribe(data => {
        this.cart = data;
      });
    }

    if (clienteId) {
      this._addressService.getUserAddresses(clienteId).subscribe(data => {
        this.selectedAddress = data[0];
      });
    }

    this.paymentMethod = paymentMethod;
    this.shippingCost = shippingCost;
  }

  public calculateTotal(): number {
    let total = 0;
    if (this.cart.items) {
      this.cart.items.forEach((item: any) => {
        total += item.product.preco * item.quantity;
      });
    }
    return total + this.shippingCost;
  }

  public backToPayment(): void {
    this._router.navigate(['/payment']);
  }

  public completePurchase(): void {
    const clienteId = parseInt(sessionStorage.getItem('clienteId')!, 10);

    const orderData = {
      clienteId,
      produtos: this.cart.items.map((item: any) => ({
        produtoId: item.product.id,
        quantidade: item.quantity
      })),
      enderecoEntrega: {
        cep: this.selectedAddress?.cep,
        logradouro: this.selectedAddress?.logradouro,
        numero: this.selectedAddress?.numero,
        complemento: this.selectedAddress?.complemento,
        bairro: this.selectedAddress?.bairro,
        cidade: this.selectedAddress?.cidade,
        uf: this.selectedAddress?.uf
      },
      valorFrete: this.shippingCost,
      formaPagamento: this.paymentMethod,
      status: 'aguardando pagamento',
      numeroPedido: null
    };

    this._orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this._toastService.success(`Pedido ${response.numeroPedido} criado com sucesso. Total: R$ ${this.calculateTotal().toFixed(2)}`);
        sessionStorage.removeItem('cartId');
        this._router.navigate(['/user']);
      },
      error: (error) => {
        this._toastService.error('Erro ao criar pedido. Tente novamente mais tarde.');
        console.error('Error creating order:', error);
      }
    });
  }
}
