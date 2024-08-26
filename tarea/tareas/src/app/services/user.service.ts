import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where,arrayUnion, getDoc, getDocs } from '@angular/fire/firestore';


providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usuarioName:string = '';
 
  constructor(private firestore: Firestore,private auth:Auth, private router:Router) { }


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
    this.router.navigate(['/tareas', user]);
  }
  logout(){

    return signOut(this.auth);
  }
  goToAdministrador(user:string){
    this.router.navigate(['administrador', user]);
  } 

  //obtener el usuario logueado
  getUser(){
    sessionStorage.setItem('email', this.auth.currentUser?.email || '');
    return this.auth.currentUser?.email;

  }

  //obtener unicamente el nombre del correo sin el dominio
  getUserName(){
    return this.usuarioName;
  }


//cargar los usuarios de la coleccion usuarios de firebase
  async getUsers(): Promise<Observable<any[]>> {
    const usersCollection = collection(this.firestore, 'usuarios');
    const querySnapshot = await getDocs(usersCollection);
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return new Observable(observer => {
      observer.next(users);
    });
  }



  //agregar un usuario a la coleccion usuarios de firebase
  async addUser(user: any) {
    const usersCollection = collection(this.firestore, 'usuarios');
    return addDoc(usersCollection, user);
  }

  //eliminar un usuario de la coleccion usuarios de firebase
  async deleteUser(id: string) {
    const userDoc = doc(this.firestore, 'usuarios', id);
    return deleteDoc(userDoc);
  }

  //actualizar un usuario de la coleccion usuarios de firebase
  async updateUser(id: string, user: any) {
    const userDoc = doc(this.firestore, 'usuarios', id);
    return updateDoc(userDoc, user);
  }

  //obtener un usuario de la coleccion usuarios de firebase
  async getUserById(id: string) {
    const userDoc = doc(this.firestore, 'usuarios', id);
    const userSnapshot = await getDoc(userDoc);
    return userSnapshot.data();
  }

  //obtener un usuario de la coleccion usuarios de firebase por su email
  async getUserByEmail(email: string) {
    const usersCollection = collection(this.firestore, 'usuarios');
    const q = query(usersCollection, where('correo', '==', email+'@dnsffaa.gub.uy'));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      const nombre = data['nombre'];
      const rol = data['rol'];
      return { id,nombre,rol,...data };
    });
    return users[0];
  }

  //obtener un usuario de la coleccion usuarios de firebase por su nombre
  async getUserByName(name: string) {
    const usersCollection = collection(this.firestore, 'usuarios');
    const q = query(usersCollection, where('nombre', '==', name));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return users[0];
  }

  //
  
}
