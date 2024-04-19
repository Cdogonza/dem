import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pass',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule, ReactiveFormsModule,MatCardModule],
  templateUrl: './pass.component.html',
  styleUrl: './pass.component.css'
})

export class PassComponent {
  form: FormGroup;


  constructor( private UserService: UserService) { 
    this.form = new FormGroup({
      password: new FormControl()
    });

  }

  onSubmit() {
    this.UserService.sendPasswordResetEmail(this.form.value.password);
      
  }


}
