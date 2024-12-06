import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
/* import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
 */
@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    const toExclude = '/login';
    //tester s'il sagit de login, on n'ajoute pas le header Authorization
    //puisqu'on a pas encode de JWT (il est null)
    if (request.url.search(toExclude) === -1) {
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone({
        setHeaders: { Authorization: 'Bearer ' + jwt }
      });
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }
}
