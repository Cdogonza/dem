import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth, private router:Router) { }



  register(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  login(email:string){
    return signInWithEmailAndPassword(this.auth, email, '123456')
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
  goToTareas(){
    this.router.navigate(['tareas']);
  }
  logout(){

    return signOut(this.auth);
  }
  goToAdministrador(){
    this.router.navigate(['administrador']);
  } 

  
}
