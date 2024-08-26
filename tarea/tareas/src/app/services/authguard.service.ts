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

admin : boolean;
  nombreUser = sessionStorage.getItem('nombre')||'';

  us = this.auth.currentUser?.email;
  constructor(private auth: Auth, private firestore: Firestore, private userService: UserService) {
    this.admin = false;
  }


   checkEmailMatch(){
    if(this.nombreUser == 'gpaz'|| this.nombreUser == 'eclara'){
      return true;
    }else{

      alert('No tiene permisos para acceder a esta pagina');
      return false;
    }
   }


  //chequear si el rol es jefatura y que devuelva un booleano
    async isAdmin(){
      const user = await this.userService.getUserByEmail(this.nombreUser);
      if(user.rol == 'jefatura'){
        this.admin = true;
        
      }else{
        this.admin = false;
        alert('No tiene permisos para acceder a esta pagina');
      }
      return this.admin;
    }
    async isAdmin2(){
      const user = await this.userService.getUserByEmail(this.nombreUser);
      if(user.rol == 'jefatura'){
        this.admin = true;
        
      }else{
        this.admin = false;
       
      }
      return this.admin;
    }

}


