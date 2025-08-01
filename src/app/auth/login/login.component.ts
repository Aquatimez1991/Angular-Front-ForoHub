import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpClientModule  } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    const datos = this.form.value;
    this.http.post<{ token: string }>(`${environment.apiUrl}/login`, datos).subscribe({
      next: (resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuarioLogin', this.form.value.login); 
        this.router.navigate(['/foro']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.error = 'Credenciales inválidas';
        } else {
          this.error = 'Error al iniciar sesión';
        }
      }
    });
  }
}
