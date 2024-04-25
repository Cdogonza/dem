import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { collection, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Route } from '@angular/router';
import Tarea from '../tarea';
import  Usser from '../user';


@Injectable({
  providedIn: 'root'
})

export class AuthguardService {


   nombreUser = sessionStorage.getItem('nombre')||'';

  constructor(private auth:Auth, private firestore : Firestore, private userService:UserService) { 
  }

  isAdmin() {
   
    const ref = collection(this.firestore, 'usuarios');
    const us = this.auth.currentUser?.email;
    const q = query(ref, where('correo', '==', this.userService.getUserName));
    const user = collectionData(q) as Observable<Usser[]>;
    if(user.subscribe(user => {
      if(user[0].correo == us){
        return true;
      
      }
      else{
        return false;

      }}
    )
    )
      return false;
    }
//ver si el rol del usuario logeado es admin segun una colleccion de firebase llamada usuarios y un campo llamado rol



// isAdmin(){
//   if(this.userService.getUserName() == 'gpaz' || this.userService.getUserName() == 'eclara'){

//     return true;
//   }else{
//     console.log(this.userService.getUserName() );
//     return false;
//   }
  
// }
}
