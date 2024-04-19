import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where } from '@angular/fire/firestore';
import Tarea from '../tarea';
import { Observable } from 'rxjs';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  
  constructor(private firestore: Firestore, private userService: UserService) { 

  }



  addTarea(tarea: Tarea) {
    const tareasCollection = collection(this.firestore, 'tareas');
    return addDoc(tareasCollection, tarea);
  }

//obtengo todas las tareas publicadass
getData(): Observable<Tarea[]> {
  const ref = collection(this.firestore, 'tareas');

return collectionData(ref, {idField: 'id'}) as Observable<Tarea[]>;
}
 
// mostrar tarea si esta pendiente
 filterBy(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('estado', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}
// mostrar tarea si esta pendiente
filterByCompletas(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('estado', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}
filterByCompletasMias(categoriaToFilter: string, user: string) {  
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('estado', '==', categoriaToFilter), where('user','==',user)), {idField: 'id'}) as Observable<Tarea[]>;
}

getTodasLasTareas(user: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('user','==',user)), {idField: 'id'}) as Observable<Tarea[]>;
}

//borrar tarea
deleteTarea(id: Tarea['id']) {
  const ref = doc(this.firestore, 'tareas', id);
  return deleteDoc(ref);
}

//cambiar el estado de pendiente a completado
updateTarea(id: Tarea['id'], estado: Tarea['estado']) {
  const ref = doc(this.firestore, 'tareas', id);
  return updateDoc(ref, {estado});

}
editarTarea(id: Tarea['id'], recordatorio: string) {

  const ref = doc(this.firestore, 'tareas', id);
return updateDoc(ref, {recordatorio});
  
  
}
// mostrar tarea de cada usuario
filterByUser(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('user', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}


}
