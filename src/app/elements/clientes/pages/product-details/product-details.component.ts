import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/produtos/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product | null = null;

  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    const productId = this._route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(+productId);
    }
  }

  private loadProduct(productId: number): void {
    this._productService.getProducts().subscribe((products) => {
      this.product = products.find((product: Product) => product.id === productId) || null;
      if (this.product) {
        this._productService.getProductImageUrl(this.product.id).subscribe(blob => {
          const objectUrl = URL.createObjectURL(blob);
          this.product!.imagemUrl = objectUrl;
        });
      }
    });
  }

  public comprar(): void {
    this._router.navigate(['/cart']);
  }
}
