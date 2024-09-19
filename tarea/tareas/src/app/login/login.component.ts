import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,RouterOutlet,NgIf,MatInputModule,MatButtonModule,FormsModule, ReactiveFormsModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;
  error: string = 'Algo Salio mal';
  usuario: string = '';
  nombreUser = '';
  constructor(
    private UserService: UserService
  ) { 
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.nombreUser = sessionStorage.getItem('nombre') || '';
  }

  onSubmit() {
    Loading.standard('Cargando...');
    const email = this.form.value;
    const pass = email.password;
    const emailCompleto = email.email + '@dnsffaa.gub.uy';
    this.UserService.login(emailCompleto.toLowerCase(),pass, email.email.toLowerCase())
      .then(() => {
        Loading.remove(2000);
        Notify.success('Bienvenido');
        this.goToTareas(email.email.toLowerCase());
        
        this.limpiar();
      
      })
      .catch((error) => {
        Notify.failure('Credenciales incorrectas');
        Loading.remove(2000);
        console.log(error);
        this.error = error.message;
      });
  }
  limpiar() {
    this.form?.reset();
  }
  goToTareas(user:string) {
    sessionStorage.setItem('nombre', user);
    sessionStorage.setItem('email', user + '@dnsffaa.gub.uy');
    this.UserService.goToTareas(user);
  }

}
