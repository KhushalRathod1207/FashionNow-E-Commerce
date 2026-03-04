import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

export const authGuard = () => {
  const shopService = inject(ShopService);
  const router = inject(Router);

  if (shopService.token()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
