import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { EnderecoEntregaFormModel, SignUpFormModel } from '../../models/singnup-form.model';
import { CommonModule } from '@angular/common';
import { DefaultLoginLayoutComponent } from '../../../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../../../components/primary-input/primary-input.component';
import { SingUpService } from '../../services/singup/sing-up.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  templateUrl: './singnup.component.html',
  styleUrl: './singnup.component.scss'
})
export class SignUpComponent {
  public signUpForm!: FormGroup<SignUpFormModel>;
  public enderecos: FormArray<FormGroup<EnderecoEntregaFormModel>>;

  private readonly _router = inject(Router);
  private readonly _toastService = inject(ToastrService);
  private readonly _signUpService = inject(SingUpService);
  private readonly _http = inject(HttpClient);

  constructor() {
    this.enderecos = new FormArray<FormGroup<EnderecoEntregaFormModel>>([]);
    this.signUpForm = new FormGroup<SignUpFormModel>({
      nomeCompleto: new FormControl<string | null>('', [Validators.required]),
      dataNascimento: new FormControl<string | null>('', [Validators.required]),
      genero: new FormControl<string | null>('', [Validators.required]),
      password: new FormControl<string | null>('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl<string | null>('', [Validators.required, Validators.email]),
      cpf: new FormControl<string | null>('', [Validators.required]),
      cepFaturamento: new FormControl<string | null>('', [Validators.required]),
      logradouroFaturamento: new FormControl<string | null>('', [Validators.required]),
      numeroFaturamento: new FormControl<string | null>('', [Validators.required]),
      complementoFaturamento: new FormControl<string | null>(''),
      bairroFaturamento: new FormControl<string | null>('', [Validators.required]),
      cidadeFaturamento: new FormControl<string | null>('', [Validators.required]),
      ufFaturamento: new FormControl<string | null>('', [Validators.required]),
      enderecos: this.enderecos
    });
  }

  public addEndereco(): void {
    this.enderecos.push(new FormGroup<EnderecoEntregaFormModel>({
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      isDefault: new FormControl<boolean | null>(false)
    }));
  }

  public removeEndereco(index: number): void {
    this.enderecos.removeAt(index);
  }

  public setDefaultEndereco(index: number): void {
    this.enderecos.controls.forEach((control, i) => {
      control.get('isDefault')?.setValue(i === index);
    });
  }

  public submit(): void {
    if (this.signUpForm.valid) {
      const signUpData = {
        ...this.signUpForm.value,
        dataNascimento: this.formatDate(this.signUpForm.value.dataNascimento!),
        enderecosEntrega: this.enderecos.controls.map(group => group.value)
      };

      this._signUpService.signUp(signUpData).subscribe({
        next: () => this._toastService.success('Cadastro feito com sucesso'),
        error: () => this._toastService.error('Erro inesperado! Tente novamente mais tarde')
      });
    }
  }

  private formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  public checkCep(event: any, type: 'faturamento' | number): void {
    const cep = event.target.value.trim();
    if (cep.length === 8) {
      this.validateCep(cep, type);
    } else {
      this._toastService.error('CEP deve ter 8 dígitos.');
    }
  }

  private validateCep(cep: string, type: 'faturamento' | number): void {
    this._http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (data: any) => {
        if (data.erro) {
          this._toastService.error('CEP não encontrado.');
        } else {
          const enderecoData = {
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          };

          if (type === 'faturamento') {
            this.signUpForm.patchValue({
              logradouroFaturamento: data.logradouro,
              bairroFaturamento: data.bairro,
              cidadeFaturamento: data.localidade,
              ufFaturamento: data.uf
            });
          } else {
            const enderecoForm = this.enderecos.at(type) as FormGroup;
            enderecoForm.patchValue(enderecoData);
          }
        }
      },
      error: () => {
        this._toastService.error('Erro ao buscar o CEP. Tente novamente.');
      }
    });
  }

  public navigate(): void {
    this._router.navigate(['login']);
  }
}
