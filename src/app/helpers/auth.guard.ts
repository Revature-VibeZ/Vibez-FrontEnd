import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//This interceptor's purpose to is reroute any unauthorized user to login if they try accessing a protected route in app-routing.module.ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        let currentUser: any = sessionStorage.getItem('currentUser');
        if (currentUser) return true;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/login']);
        })
        return false;
    }
}