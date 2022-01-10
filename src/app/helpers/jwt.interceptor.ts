import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
//This component will attach a header with the user's JWT token to any request made to the back end as a way of authorization. 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser: any = sessionStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);
        if (!currentUser) return next.handle(request);
        let token = currentUser.token;

        //takes all http requests and adds a bearer token if the user is logged in
        if (currentUser) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            })           
        }
        return next.handle(request);
    }
}