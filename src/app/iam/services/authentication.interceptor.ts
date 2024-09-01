import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";


export const authenticationInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token');
  const handledRequest = token
    ? request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
    : request;
  if (!environment.production) console.log('Request:', handledRequest);
  return next(handledRequest);
}
