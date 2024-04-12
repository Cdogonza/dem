import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import Tarea from '../tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: Firestore) { }


  addTarea(tarea: Tarea) {
    const tareasCollection = collection(this.firestore, 'tareas');
    return addDoc(tareasCollection, tarea);
  }

 getData(): Observable<Tarea[]> {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(ref, {idField: 'id'}) as Observable<Tarea[]>;
 }







}
