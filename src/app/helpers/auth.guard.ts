import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

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