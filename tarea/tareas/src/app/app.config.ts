import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tarasjefaturadem","appId":"1:353101903623:web:535cf4ad9b639bcc2a77a2","storageBucket":"tarasjefaturadem.appspot.com","apiKey":"AIzaSyCFGoBCdCYu1QJULQ1k0W0EzVi1NlQpKqM","authDomain":"tarasjefaturadem.firebaseapp.com","messagingSenderId":"353101903623"}))), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
