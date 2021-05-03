import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor() { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let jwt = '';
        if(localStorage.getItem('todo-user')) {
            jwt = JSON.parse(localStorage.getItem('todo-user')).token;
        }

        request = request.clone({
            setHeaders: {
                jwt_token: jwt
            }
        })
        
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }));
    }
}