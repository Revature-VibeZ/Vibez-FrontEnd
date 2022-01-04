import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../components/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let currentUser = this.authservice.currentUserValue;
        let currentUser = sessionStorage.getItem('currentUser');
        let token = currentUser?.slice(1, currentUser.length).slice(0, -1).split(":")[1].split(`"`)[1];
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