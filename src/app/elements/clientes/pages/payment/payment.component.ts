import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  public paymentForm: UntypedFormGroup;
  public paymentMethod: string = '';
  public shippingCost: number = 0;

  constructor(private readonly _fb: UntypedFormBuilder, private readonly _router: Router) {
    this.paymentForm = this._fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardName: ['', Validators.required],
      cardExpiry: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
      cardCVV: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      installments: ['', [Validators.required, Validators.min(1), Validators.max(12)]]
    });

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      this.paymentMethod = value;
      if (value === 'boleto') {
        this.paymentForm.get('cardNumber')?.disable();
        this.paymentForm.get('cardName')?.disable();
        this.paymentForm.get('cardExpiry')?.disable();
        this.paymentForm.get('cardCVV')?.disable();
        this.paymentForm.get('installments')?.disable();
      } else {
        this.paymentForm.get('cardNumber')?.enable();
        this.paymentForm.get('cardName')?.enable();
        this.paymentForm.get('cardExpiry')?.enable();
        this.paymentForm.get('cardCVV')?.enable();
        this.paymentForm.get('installments')?.enable();
      }
    });
  }

  public submitPayment(): void {
    this._router.navigate(['/order-sumary']);
    sessionStorage.setItem('formaPagamento', this.paymentForm.value.paymentMethod);
    sessionStorage.setItem('valorFrete', this.shippingCost.toString());
  }
}
