import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public order: any = null;

  private readonly _route = inject(ActivatedRoute);
  private readonly _orderService = inject(OrderService);
  private readonly _router= inject(Router);

  ngOnInit(): void {
    const orderId = parseInt(this._route.snapshot.paramMap.get('id')!, 10);
    if (orderId) {
      this._orderService.getOrder(orderId).subscribe(data => {
        this.order = data;
      });
    }
  }

  public calculateTotalPerProduct(product: any): number {
    return product.preco * product.quantidade;
  }

  public backToOrders(): void {
    this._router.navigate(['/orders-list']);
  }
}
