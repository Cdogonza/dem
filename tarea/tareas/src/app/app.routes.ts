import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TareasComponent } from './tareas/tareas.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { PassComponent } from './pass/pass.component';
import { authGuard } from './auth.guard';
import { NovedadesComponent } from './novedades/novedades.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
   

    {path: 'tareas/:user', component: TareasComponent}, 
    {path: 'register/:user', component: RegisterComponent, canActivate:[authGuard]},
    {path: 'administrador/:user', component: AdministradorComponent, canActivate:[authGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'pass/:user', component: PassComponent},
    {path: 'novedades/:user', component: NovedadesComponent},
    {path: 'home/:user', component: HomeComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'},
];



