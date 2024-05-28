import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamentos',
  standalone: true,
  imports: [],
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss'
})
export class PagamentosComponent {
  formaDePagamento: string = '';
  numeroCartao: string = '';
  nomeTitular: string = '';
  mesVencimento: string = '';
  anoVencimento: string = '';
  codigoValidacao: string = '';
  numeroParcelas: string = '';

  onSubmit() {
    console.log('Forma de pagamento:', this.formaDePagamento);
    console.log('Número do cartão:', this.numeroCartao);
    console.log('Nome do titular:', this.nomeTitular);
    console.log('Data de vencimento:', this.mesVencimento, '/', this.anoVencimento);
    console.log('Código de validação:', this.codigoValidacao);
    console.log('Número de parcelas:', this.numeroParcelas);
  }
}
