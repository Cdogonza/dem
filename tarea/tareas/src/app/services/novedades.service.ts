import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where,arrayUnion, docData } from '@angular/fire/firestore';
import {orderBy, getDocs } from '@firebase/firestore';
import Novedad from '../novedad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  constructor(private firestore: Firestore) { 
  }
  addNovedad(novedad: Novedad) {
    const novedadesCollection = collection(this.firestore, 'novedades');
    return addDoc(novedadesCollection, novedad);

  }
  getData(): Observable<Novedad[]> {
    const ref = collection(this.firestore, 'novedades');
    const queryRef = query(ref, orderBy('fecha', 'asc')); // Ordenar por el campo 'fecha'
    return collectionData(queryRef, { idField: 'id' }) as Observable<Novedad[]>;
  }

  getDataByDate(date: string) {
    const ref = collection(this.firestore, 'novedades');
    const queryRef = query(ref, where('fecha', '==', date));
    return collectionData(queryRef, { idField: 'id' })as Observable<Novedad[]>;
  }
  getById(id: string): Observable<any> {
    const docRef = doc(this.firestore, `novedades/${id}`);
    return docData(docRef);
  }
}
