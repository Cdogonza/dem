import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthguardService } from './services/authguard.service';
import { UserService } from './services/user.service';


export const authGuard: CanActivateFn = (route, state) => {

const authservice = inject(AuthguardService)
const userService = inject(UserService);
const router = inject(Router);

const nombreUser = sessionStorage.getItem('nombre')||'';

  // if(nombreUser == 'gpaz'){
  //   return true;
  // }else{
  //   console.log(userService.getUserName() );
  //   alert('No tiene permisos para acceder a esta pagina');
  //   // const urltree = router.createUrlTree(['/login']);
  //   return false;
  // }
  if(authservice.isAdmin()){
    return true;
  }else{
    console.log(userService.getUserName() );
    alert('No tiene permisos para acceder a esta pagina');
    // const urltree = router.createUrlTree(['/login']);
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
