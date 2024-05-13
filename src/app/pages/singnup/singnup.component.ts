import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { SingUpService } from '../../services/singUp/singUp.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  providers: [LoginService],
  templateUrl: './singnup.component.html',
  styleUrl: './singnup.component.scss'
})
export class SignUpComponent {
  public signUpForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _signUpService: SingUpService,
    private readonly _toastService: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      cepFaturamento: new FormControl('', [Validators.required]),
      logradouroFaturamento: new FormControl('', [Validators.required]),
      numeroFaturamento: new FormControl('', [Validators.required]),
      complementoFaturamento: new FormControl(''),
      bairroFaturamento: new FormControl('', [Validators.required]),
      cidadeFaturamento: new FormControl('', [Validators.required]),
      ufFaturamento: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required])
    });
  }

  public submit(): void {
    if (this.signUpForm.valid) {
      this._signUpService.singUp(this.signUpForm.value).subscribe({
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
