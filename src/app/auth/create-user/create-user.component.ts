import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  form: FormGroup;
  
  constructor( 
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router ) 
    {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      mensaje: ['', Validators.required],
      nombreCurso: ['', Validators.required]
    });
  }

 
  irAlLogin(): void {
    this.router.navigate(['/auth/login']);
  }

 onSubmitCrearUsuario() {
    if (this.form.invalid) return;

    this.userService.crearUsuario(this.form.value).subscribe({
      next: () => this.router.navigate(['/foro']),
      error: (err) => console.error('Error al registrar usuario', err)
    });
  }
}


