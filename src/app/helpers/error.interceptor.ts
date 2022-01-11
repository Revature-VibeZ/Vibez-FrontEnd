import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService} from "../services/auth.service";
import { Router } from "@angular/router";
    //This error interceptor will listen for any 401 status events and in the case of a 401, it will log out user and redirect them to the login page.
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService, private router: Router){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.status === 401) {
            this.authservice.logout();
            this.router.navigate(['/login']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
    }
}