import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usuarioName:string = '';
 
  constructor(private auth:Auth, private router:Router) { }


  sendPasswordResetEmail(email:string){
    return sendPasswordResetEmail(this.auth, email).then(() => {
      alert('Se ha enviado un correo para restablecer su contraseña');
    }).catch((error) => {
      alert('Error al enviar el correo');
    });
  }

  register(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  login(email:string,password:string, userName:string){
    this.usuarioName = userName;
    return signInWithEmailAndPassword(this.auth, email, password)
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
  goToTareas(user:string){
    this.router.navigate(['tareas', user]);
  }
  logout(){

    return signOut(this.auth);
  }
  goToAdministrador(user:string){
    this.router.navigate(['administrador', user]);
  } 

  //obtener el usuario logueado
  getUser(){
    return this.auth.currentUser?.email;
  }

  //obtener unicamente el nombre del correo sin el dominio
  getUserName(){
    return this.usuarioName;
  }



  
}
