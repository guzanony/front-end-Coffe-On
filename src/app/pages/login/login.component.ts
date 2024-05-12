import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginForm } from '../../models/login-form.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
public loginForm!: FormGroup<LoginForm>;

  constructor(private readonly _router: Router, private readonly _loginService: LoginService, private readonly _toastService: ToastrService) {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  public submit(): void {
    this._loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this._toastService.success('Login feito com sucesso'),
      error: () => this._toastService.error('Erro inesperado! Tente novamente mais tarde')
    })
  }

  public navigate(): void {
    this._router.navigate(['singnup']);
  }
}
