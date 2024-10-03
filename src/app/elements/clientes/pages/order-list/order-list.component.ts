import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrdersListComponent implements OnInit {

  public orders: any[] = [];
  private readonly _router = inject(Router);
  private readonly _orderService = inject(OrderService);
  private readonly _toastService = inject(ToastrService);

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    const clienteId = parseInt(sessionStorage.getItem('clienteId')!, 10);

    if (clienteId) {
      this._orderService.getOrdersByClienteId(clienteId).subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (error) => {
          this._toastService.error('Erro ao carregar pedidos. Tente novamente mais tarde.');
          console.error('Error loading orders:', error);
        }
      });
    }
  }

  public viewOrderDetails(orderId: number): void {
    this._router.navigate(['/order-details', orderId]);
  }
}
