import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/produtos/product.service';
import { CartService } from '../../services/carrinho/carrinho.service';

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
  private readonly _cartService = inject(CartService);

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
    // const cartItem = { productId: product.id, userName: this.getNameForCart(), quantity: 1 };
    // console.log('Adding to cart:', cartItem);
    // this._cartService.addItemToCart(this.cartId, product.id, 1).subscribe({
    //   next: (resp) => {
    //     console.log('Product added to cart successfully', resp);
    //     this.updateCartCount();
    //   },
    //   error: (error) => {
    //     console.error('Error adding product to cart:', error);
    //   }
    // });
    this._router.navigate(['/cart']);
  }
}
