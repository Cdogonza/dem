import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import Tarea from '../tarea';


@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private firestore: Firestore) { }


  addTarea(tarea: Tarea) {
    const tareasCollection = collection(this.firestore, 'tareas');
    return addDoc(tareasCollection, tarea);
  }





}
