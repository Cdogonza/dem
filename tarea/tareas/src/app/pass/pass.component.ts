import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavtareasComponent } from "../navtareas/navtareas.component";
@Component({
  selector: 'app-pass',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule, RouterModule, RouterOutlet, NavtareasComponent],
  templateUrl: './pass.component.html',
  styleUrl: './pass.component.css'
})

export class PassComponent {
  form: FormGroup;
  nombreUser = '';

  constructor(private router:Router,private UserService: UserService, route : Router) { 
    this.form = new FormGroup({
      password: new FormControl()
    });
    sessionStorage.setItem('nombre', this.nombreUser);
  }

  cambiarPass() {
    const emailCompleto = this.form.value.password + '@dnsffaa.gub.uy';
    this.UserService.sendPasswordResetEmail(emailCompleto);
    // ir a login

    // dirigirse al componente tareas 
    this.router.navigate(['/tareas', this.UserService.getUserName()]);


    
      
  }


  getUser(){
    this.router.navigate(['/tareas', this.UserService.getUserName()]);
  }

OnInit(){
  sessionStorage.setItem('nombre', this.nombreUser);
}
}
