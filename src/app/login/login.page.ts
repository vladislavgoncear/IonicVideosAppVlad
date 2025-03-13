import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tabs']);
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = 'El usuario no tiene acceso. Verifique sus credenciales.';
        } else {
          this.errorMessage = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
        }
        console.error('Login failed', error);
      }
    );
  }
}