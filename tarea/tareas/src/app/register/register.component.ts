import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,RouterOutlet,NgIf,MatInputModule,MatButtonModule,FormsModule, ReactiveFormsModule,MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  
  form: FormGroup;
  error: string = 'Algo Salio mal';

  constructor(
    private router:Router,
    private UserService: UserService
  ) { 
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  getUser(){
    this.router.navigate(['/administrador', this.UserService.getUserName()]);
  }
  onSubmit() {
    
    const { email, password } = this.form.value;
    
    this.UserService.register(email, password)
      .then(() => {
       this.limpiar();
       this.goToLogin();

      })
      .catch((error) => {
        console.log(error);
        this.error = error.message;
      });
  }
  limpiar() {
    this.form?.reset();
  }
  goToLogin() {
    this.router.navigate(['/administrador', this.UserService.getUserName()]);
    
  }
  

}
