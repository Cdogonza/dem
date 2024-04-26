import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collection } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Route } from '@angular/router';
import Tarea from '../tarea';
import  Usser from '../user';
import { Inject } from '@angular/core';




@Injectable({
  providedIn: 'root'
})

export class AuthguardService {


  nombreUser = sessionStorage.getItem('nombre')||'';

  us = this.auth.currentUser?.email;
  constructor(private auth: Auth, private firestore: Firestore, private userService: UserService) {
  }


   checkEmailMatch(){
    console.log(this.nombreUser);
    if(this.userService.getUserName() == 'gpaz'|| this.userService.getUserName() == 'eclara'){
      return true;
    }else{

      alert('No tiene permisos para acceder a esta pagina');
      return false;
    }
   }
}


