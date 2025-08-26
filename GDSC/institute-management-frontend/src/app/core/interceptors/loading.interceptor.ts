import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Implement loading service integration
  // const loadingService = inject(LoadingService);
  // loadingService.incrementRequestCount();
  
  return next(req).pipe(
    finalize(() => {
      // loadingService.decrementRequestCount();
    })
  );
};
