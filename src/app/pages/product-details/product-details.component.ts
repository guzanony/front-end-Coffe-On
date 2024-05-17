import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {


  private readonly _router = inject(Router);

  ngOnInit(): void {
  }

  public comprar(): void {
    if (sessionStorage.getItem('auth-token')) {
      // Lógica para comprar o produto
    } else {
      this._router.navigate(['/login']);
    }
  }
}
