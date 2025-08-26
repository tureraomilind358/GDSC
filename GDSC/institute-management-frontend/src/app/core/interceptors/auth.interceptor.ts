import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  
  const token = storageService.getToken();
  
  if (token && !req.url.includes('/auth/')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  
  return next(req);
};
