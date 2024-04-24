import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthguardService } from './services/authguard.service';


export const authGuard: CanActivateFn = (route, state) => {

const authservice = inject(AuthguardService)
const router = inject(Router);
if(authservice.isAdmin()){
  return true;
}else{
  const urltree = router.createUrlTree(['/login']);
  return urltree;
}
};
