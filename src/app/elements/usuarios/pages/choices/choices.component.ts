import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TargertValueModel } from '../../model/target-value.model';

@Component({
  selector: 'app-choices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.scss'
})
export class ChoicesComponent implements OnInit {

  public tagertValue: Array<TargertValueModel> = new Array<TargertValueModel>;
  public role!: string | null;
  public username = '';
  public password = '';

  constructor(private readonly _loginService: LoginUserService, private readonly _router: Router) { }

  ngOnInit(): void {
    this.getRole();
  }

  private getRole(): void {
    this.role = sessionStorage.getItem('role');
    console.log(this.role)
    if (this.role === 'ROLE_ADMIN') {
      this.tagertValue.forEach((value) => {
        value.targetValue = 'Lista usuário';
        value.targetValue = 'Lista de produtos';
      })
    } else if (this.role === 'ROLE_ESTOQUISTA') {
      this.tagertValue.forEach((value) => {
        value.targetValue = 'Lista usuário';
        value.targetValue = 'Lista de pedidos';
      })
    } else {
      console.log('role não encobtrada')
    }
  }

}
