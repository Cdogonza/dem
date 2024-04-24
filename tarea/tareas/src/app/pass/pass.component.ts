import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-pass',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule, ReactiveFormsModule,MatCardModule,RouterModule,RouterOutlet],
  templateUrl: './pass.component.html',
  styleUrl: './pass.component.css'
})

export class PassComponent {
  form: FormGroup;


  constructor( private UserService: UserService, route : Router) { 
    this.form = new FormGroup({
      password: new FormControl()
    });
 
  }

  cambiarPass() {
    this.UserService.sendPasswordResetEmail(this.form.value.password);
      
  }


  getUser(){
    const user = this.UserService.getUserName();
    if (user) {
      this.UserService.goToTareas(user);
    }
  }


}
