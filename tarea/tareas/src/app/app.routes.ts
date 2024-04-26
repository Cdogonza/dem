import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TareasComponent } from './tareas/tareas.component';
import {redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {canActivate} from '@angular/fire/auth-guard';
import { AdministradorComponent } from './administrador/administrador.component';
import { PassComponent } from './pass/pass.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [

    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    
    {path: 'tareas/:user', component: TareasComponent}, 
    {path: 'register/:user', component: RegisterComponent, canActivate:[authGuard]},
    {path: 'administrador/:user', component: AdministradorComponent, canActivate:[authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'pass', component: PassComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'},

];



