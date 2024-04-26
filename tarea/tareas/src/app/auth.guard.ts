import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthguardService } from './services/authguard.service';
import { UserService } from './services/user.service';
import { Auth,sendPasswordResetEmail , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route, state) => {

const authservice = inject(AuthguardService)
const userService = inject(UserService);
const router = inject(Router);
const auth = inject(Auth);
const nombreUser = sessionStorage.getItem('nombre')||'';

  // if(nombreUser == 'gpaz'){
  //   return true;
  // }else{
  //   console.log(userService.getUserName() );
  //   alert('No tiene permisos para acceder a esta pagina');
  //   // const urltree = router.createUrlTree(['/login']);
  //   return false;
  // }
  // if(){
  //   return true;
  // }else{
  
  //   alert('No tiene permisos para acceder a esta pagina');
  //   // const urltree = router.createUrlTree(['/login']);
  //   return false;
  // }
  
if(authservice.checkEmailMatch()){
  console.log('es admin');
  return true;
}else{
  console.log('no es admin');
  
  return false;
  }

// if(authservice.isAdmin()){
//   console.log('es admin');
//   return true;

// }else{
//   console.log('no es admin');
//   const urltree = router.createUrlTree(['/login']);
//   return urltree;
// }
};

