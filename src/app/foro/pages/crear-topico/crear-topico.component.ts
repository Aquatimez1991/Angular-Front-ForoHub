import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicoService } from '../../services/topico.service';

@Component({
  selector: 'app-crear-topico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-topico.component.html',
   styleUrls: ['./crear-topico.component.css']
})
export class CrearTopicoComponent {
  form: FormGroup;
  caracteres: number = 0;
  cursos = ['JAVA', 'PHYTON', 'ANGULAR', 'LOGICA'];
  nombreUsuario: string = 'Usuario';

  constructor(
    private fb: FormBuilder,
    private topicoService: TopicoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      mensaje: ['', Validators.required],
      nombreCurso: ['', Validators.required]
    });

    const login = localStorage.getItem('usuarioLogin');
    if (login) {
      this.nombreUsuario = this.formatearNombreDesdeLogin(login);
    }
  }

    actualizarContador(): void {
    const mensajeControl = this.form.get('mensaje');
    this.caracteres = mensajeControl?.value?.length || 0;
  }


  onSubmit() {
    if (this.form.invalid) return;

    this.topicoService.crearTopico(this.form.value).subscribe({
      next: () => this.router.navigate(['/foro']),
      error: (err) => console.error('Error al registrar tópico', err)
    });
  }

  cancelar() {
    this.form.reset();
    this.router.navigate(['/foro']);
  }

  private formatearNombreDesdeLogin(login: string): string {
    const nombreEmail = login.split('@')[0]; // elias.salgado
    const partes = nombreEmail.split('.');   // ['elias', 'salgado']
    return partes.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '); // Elias Salgado
  }
}
