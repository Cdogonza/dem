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

  constructor(
    private UserService: UserService
  ) { 
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

  }

  onSubmit() {
    
    const { email, password } = this.form.value;
    
    this.UserService.login(email)
      .then(() => {
        this.limpiar();
        if (email === 'gpaz@dnsffaa.gub.uy' || email === 'eclara@dnsffaa.gub.uy') {
          this.UserService.goToAdministrador();
          return;
        }
        this.goToTareas();
      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }
  limpiar() {
    this.form?.reset();
  }
  goToTareas() {
    this.UserService.goToTareas();
  }

}
