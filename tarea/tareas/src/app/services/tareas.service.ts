import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where } from '@angular/fire/firestore';
import Tarea from '../tarea';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: Firestore) { 

  }


  addTarea(tarea: Tarea) {
    const tareasCollection = collection(this.firestore, 'tareas');
    return addDoc(tareasCollection, tarea);
  }


getData(): Observable<Tarea[]> {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(ref, {idField: 'id'}) as Observable<Tarea[]>;
}
// mostrar tarea si esta pendiente 

 filterBy(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('estado', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}


deleteTarea(id: Tarea['id']) {
  const ref = doc(this.firestore, 'tareas', id);
  return deleteDoc(ref);
}

//cambiar el estado de pendiente a completado
updateTarea(id: Tarea['id'], estado: Tarea['estado']) {
  const ref = doc(this.firestore, 'tareas', id);
  return updateDoc(ref, {estado});

}
}
