import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/services/auth.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authservice: AuthService
    )
{}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authservice.currentUserValue;
    if (currentUser){
        return true;
    }
    this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
    return false;
}
}