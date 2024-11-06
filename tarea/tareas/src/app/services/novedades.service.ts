import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,deleteDoc,doc, updateDoc,query,where,arrayUnion } from '@angular/fire/firestore';
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
  async getData(): Promise<Observable<Novedad[]>> {
    const ref = collection(this.firestore, 'novedades');
    return await collectionData(ref, {idField: 'id'}) as Observable<Novedad[]>;
  }
}
