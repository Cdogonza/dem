import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';


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

  constructor(
    private UserService: UserService
  ) { 
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

  }

  onSubmit() {
    
    const email = this.form.value;
    const pass = email.password;
    const emailCompleto = email.email + '@dnsffaa.gub.uy';
    this.UserService.login(emailCompleto,pass, email.email)
      .then(() => {

        if (emailCompleto === 'gpaz@dnsffaa.gub.uy' || emailCompleto === 'eclara@dnsffaa.gub.uy') {
          this.UserService.goToAdministrador(email.email);
          sessionStorage.setItem('nombre', email.email);
          return;
        }else{
        this.goToTareas(email.email);
        
        this.limpiar();
      }
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }
  limpiar() {
    this.form?.reset();
  }
  goToTareas(user:string) {
    this.UserService.goToTareas(user);
  }

}
