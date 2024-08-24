import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where,arrayUnion } from '@angular/fire/firestore';
import Tarea from '../tarea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {orderBy, getDocs } from '@firebase/firestore';


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

//obtengo todas las tareas publicadass
async getData(): Promise<Observable<Tarea[]>> {
  const ref = collection(this.firestore, 'tareas');

return await collectionData(ref, {idField: 'id'}) as Observable<Tarea[]>;
}
 
// mostrar tarea si esta pendiente
async filterBy(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return await collectionData(query(ref, where('estado', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}

// async filterByCompletasMias(categoriaToFilter: string, user: string) {  
//   const ref = collection(this.firestore, 'tareas');
//   return await collectionData(query(ref, where('estado', '==', categoriaToFilter), where('user','==',user)), {idField: 'id'}) as Observable<Tarea[]>;
// }

async filterByCompletasMias(categoriaToFilter: string, user: string): Promise<Observable<any[]>> {
  const tasksCollection = collection(this.firestore, 'tareas');
  const q = query(tasksCollection,where('user','==',user),where('estado', '==', categoriaToFilter), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });
  return new Observable(observer => {
    observer.next(tasks);
  });
}
async filterByCompletas(categoriaToFilter: string): Promise<Observable<any[]>> {
  const tasksCollection = collection(this.firestore, 'tareas');
  const q = query(tasksCollection,where('estado', '==', categoriaToFilter), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });
  return new Observable(observer => {
    observer.next(tasks);
  });
}
//Este se usa en la pantalla de cada usuario para mostrar sus tareas

async getTasks(user: string): Promise<Observable<any[]>> {
  const tasksCollection = collection(this.firestore, 'tareas');
  const q = query(tasksCollection,where('user','==',user), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map(doc => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });
  return new Observable(observer => {
    observer.next(tasks);
  });
}

//borrar tarea
async deleteTarea(id: Tarea['id']) {
  const ref = doc(this.firestore, 'tareas', id);
  return await deleteDoc(ref);
}



//cambiar el estado de pendiente a completado
async updateTarea(id: Tarea['id'], estado: Tarea['estado']) {
  const ref = doc(this.firestore, 'tareas', id);
  return await updateDoc(ref, {estado});

}
async editarTarea(id: Tarea['id'], recordatorio: string) {

  const ref = doc(this.firestore, 'tareas', id);
return await updateDoc(ref, {recordatorio});

}
async agregarComentario(id: Tarea['id'], comentario: string) {

const ref = doc(this.firestore, 'tareas', id);
return await updateDoc(ref, {comentario:arrayUnion(comentario), coment: true});

}
async editarLecturaComentario(id: Tarea['id']) {

  const ref = doc(this.firestore, 'tareas', id)

    return await updateDoc(ref, {coment: false});
  }
  async editarLecturaComentarioFalso(id: Tarea['id']) {

    const ref = doc(this.firestore, 'tareas', id)
  
      return await updateDoc(ref, {coment: true});
    }
// mostrar tarea de cada usuario
filterByUser(categoriaToFilter: string) {
  const ref = collection(this.firestore, 'tareas');
  return collectionData(query(ref, where('user', '==', categoriaToFilter)), {idField: 'id'}) as Observable<Tarea[]>;
}


}
