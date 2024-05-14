import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { SingUpService } from '../../services/singUp/singUp.service';
import { EnderecoEntregaFormModel, SignUpFormModel } from '../../models/singnup-form.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  providers: [LoginService],
  templateUrl: './singnup.component.html',
  styleUrl: './singnup.component.scss'
})
export class SignUpComponent {
  public signUpForm!: FormGroup<SignUpFormModel>;
  public enderecos: FormArray<FormGroup<EnderecoEntregaFormModel>>;

  constructor(
    private readonly _router: Router,
    private readonly _signUpService: SingUpService,
    private readonly _toastService: ToastrService
  ) {
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
      this._signUpService.signUp(this.signUpForm.value).subscribe({
        next: () => this._toastService.success('Cadastro feito com sucesso'),
        error: () => this._toastService.error('Erro inesperado! Tente novamente mais tarde')
      });
    } else {
      this._toastService.error('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  public navigate(): void {
    this._router.navigate(['login']);
  }
}
