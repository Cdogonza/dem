import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TareasComponent } from './tareas/tareas.component';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {canActivate} from '@angular/fire/auth-guard';
import { AdministradorComponent } from './administrador/administrador.component';

export const routes: Routes = [

    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    
    {path: 'tareas/:user', component: TareasComponent, ...canActivate(()=> redirectUnauthorizedTo(['login']))}, 
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'administrador/:user', component: AdministradorComponent, ...canActivate(()=> redirectUnauthorizedTo(['login']))},
    {path: '**', redirectTo: 'login', pathMatch: 'full'},

];



