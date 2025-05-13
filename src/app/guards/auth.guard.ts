import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const toastr=inject(ToastrService)
  if(sessionStorage.getItem('token')){
    return true
  }
  else{
    toastr.warning('Please login first')
    router.navigateByUrl('/login')
    return false
  }
};
