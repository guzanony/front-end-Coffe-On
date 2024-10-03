import { LoginFormUser } from './../../../clientes/models/login-form.model';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginUserService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginUserComponent implements OnInit {

  public loginForm!: FormGroup<LoginFormUser>;

  constructor(private readonly _loginUserService: LoginUserService, private readonly _router: Router, private readonly _toastService: ToastrService) {
    this.loginForm = new FormGroup<LoginFormUser>({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    //this.submit();
  }

  public submit(): void {
    if(this.loginForm.valid) {
      this._loginUserService.postLoginUser(this.loginForm.value.password, this.loginForm.value.username).subscribe((resp) => {
        this._toastService.success('Sucesso')
        console.log(resp)
      })
    }
    this._toastService.success('Sucesso')
  }
}
