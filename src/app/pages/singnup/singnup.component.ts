import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, CommonModule],
  providers: [LoginService],
  templateUrl: './singnup.component.html',
  styleUrl: './singnup.component.scss'
})
export class SignUpComponent {
public singnupForm!: FormGroup;

  constructor(private readonly _router: Router, private readonly _loginService: LoginService, private readonly _toastService: ToastrService, private readonly _fb: FormBuilder) {
    this.singnupForm = this._fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      enderecosEntrega: this._fb.array([this.createEnderecoEntrega()]),
      cepFaturamento: ['', [Validators.required]],
      logradouroFaturamento: ['', [Validators.required]],
      numeroFaturamento: ['', [Validators.required]],
      complementoFaturamento: ['', [Validators.required]],
      bairroFaturamento: ['', [Validators.required]],
      cidadeFaturamento: ['', [Validators.required]],
      ufFaturamento: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]]
    })
  }

  public createEnderecoEntrega(): FormGroup {
    return this._fb.group({
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      preferencial: [false]
    });
  }

  public get enderecosEntrega(): FormArray {
    return this.singnupForm.get('enderecosEntrega') as FormArray;
  }

  public adicionarEnderecoEntrega(): void {
    this.enderecosEntrega.push(this.createEnderecoEntrega());
  }

  public removerEnderecoEntrega(index: number): void {
    this.enderecosEntrega.removeAt(index);
  }

  public submit(): void {
    this._loginService.login(this.singnupForm.value.email, this.singnupForm.value.password).subscribe({
      next: () => this._toastService.success('Login feito com sucesso'),
      error: () => this._toastService.error('Erro inesperado! Tente novamente mais tarde')
    })
  }

  public navigate(): void {
    this._router.navigate(['login']);
  }
}
