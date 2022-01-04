import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser!: User;
  
  constructor(
    private router: Router,
    private authservice: AuthService
  ) {
    this.authservice.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
