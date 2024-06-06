import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product-service.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  public product: any = null;
  public products = new Array<Product>();

  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');
    this.loadProduct(productId);
    this.getProduct();
  }

  loadProduct(productId: string | null) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    this.product = products.find((product: any) => product.id === productId);
  }

  public comprar(): void {
    this._router.navigate(['/cart']);
  }

  private getProduct(): void {
    this._productService.getProducts().subscribe((resp)=> {
      console.log(resp)
    this.products = resp;
    })
  }
}
