import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user} from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { collection, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  
  constructor(private auth:Auth, private firestore : Firestore) { }


//ver si el rol del usuario logeado es admin segun una colleccion de firebase llamada usuarios y un campo llamado rol
filterBy(){
  const q = query(collection(this.firestore,'usuarios'), where('rol','==','admin'));
  const users = collectionData(q);
  let isAdmin = false;
  users.forEach((user: any) => {
    if (user.data().correo == this.auth.currentUser?.email){ // Access email property using data()
      isAdmin = true;
    }
  });
  return isAdmin;
}

isAdmin(){
  if (this.filterBy()){
    return true;
  }else{
    return false;

  }
  
}
}
