import { Component, inject } from '@angular/core';
import { Address } from '../../models/singnup-form.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../../services/enderecos/address-service.';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ViaCepService } from '../../services/cep-api/via-cep.service';

@Component({
  selector: 'app-add-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-address-form.component.html',
  styleUrl: './add-address-form.component.scss'
})
export class AddAddressFormComponent {
  public newAddress: Address = {
    id: 0,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: ''
  };

  private readonly _dialogRef = inject(MatDialogRef<AddAddressFormComponent>);
  private readonly _addressService = inject(AddressService);
  private readonly _viaCepService = inject(ViaCepService);

  public addAddress(): void {
    const clienteId = parseInt(sessionStorage.getItem('clienteId')!, 10);
    if (clienteId) {
      this._addressService.addAddress(clienteId, this.newAddress).subscribe({
        next: (address) => {
          this._dialogRef.close(address);
        },
        error: (error) => {
          console.error('Error adding address:', error);
        }
      });
    } else {
      console.error('Cliente ID not found in session storage');
    }
  }

  public fetchAddressByCep(): void {
    if (this.newAddress.cep) {
      this._viaCepService.getCep(this.newAddress.cep).subscribe({
        next: (data) => {
          this.newAddress.logradouro = data.logradouro;
          this.newAddress.bairro = data.bairro;
          this.newAddress.cidade = data.localidade;
          this.newAddress.uf = data.uf;
        },
        error: (error) => {
          console.error('Error fetching address:', error);
        }
      });
    }
  }
}
