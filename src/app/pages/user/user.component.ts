import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

    public name: string | null = '';

    private readonly _router = inject(Router);

    ngOnInit(): void {
        this.name = sessionStorage.getItem('username');
    }

    public navigate(): void {
       this._router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
      return !!sessionStorage.getItem('auth-token');
    }

    public logout(): void {
      sessionStorage.removeItem('auth-token');
      sessionStorage.removeItem('username');
      this._router.navigate(['']);  // Redireciona para a página principal sem o nome
    }

    public navigateLogin(): void {
      this._router.navigate(['/login']);
    }

    public navigateSingUp(): void {
      this._router.navigate(['/singnup']);
    }
  }

