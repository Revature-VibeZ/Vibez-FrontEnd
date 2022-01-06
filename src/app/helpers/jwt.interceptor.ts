import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser: any = sessionStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);
        if(!currentUser) return next.handle(request);
        let token = currentUser.token;
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        
        return next.handle(request);
    }
}