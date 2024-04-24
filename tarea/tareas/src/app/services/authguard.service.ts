import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user} from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { collection, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

   nombreUser = sessionStorage.getItem('nombre')||'';
  constructor(private auth:Auth, private firestore : Firestore, private userService:UserService) { 
    
  }


//ver si el rol del usuario logeado es admin segun una colleccion de firebase llamada usuarios y un campo llamado rol
filterBy(){
  const q = query(collection(this.firestore,'usuarios'), where('rol','==','admin'));
  const users = collectionData(q);
  let isAdmin = false;
  users.forEach((user: any) => {
    if (user.data().correo == this.nombreUser){ // Access email property using data()
      isAdmin = true;
    }
  });
  return isAdmin;
}

// isAdmin(){
//   if (this.filterBy()){
//     return true;
//   }else{
//     return false;

//   }
  
// }
isAdmin(){
  if(this.userService.getUserName() == 'gpaz' || this.userService.getUserName() == 'eclara'){

    return true;
  }else{
    console.log(this.userService.getUserName() );
    return false;
  }
  
}
}
