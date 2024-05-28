import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  product: any = null;

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');
    this.loadProduct(productId);
  }

  loadProduct(productId: string | null) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.product = products.find((product: any) => product.id === productId);
  }

  public comprar(): void {
    this._router.navigate(['/cart']);
  }
}
