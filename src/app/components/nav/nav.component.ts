import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private as: AuthService
  ) {}
  sessionStorage = sessionStorage;
  ngOnInit(): void {}
  search: String = '';

  /*
  Saves username typed into search bar into the sessionStorage and then redirects to user profile.
  Will need some tweaking eventually.
  */
  searchByUsername(username: string) {
    sessionStorage.setItem('username', username);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    });
  }

  /*
  Reloads the profile conponent without reloading the page.
  */
  loadProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    });
  }

  loadPostFeed() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['postfeed']);
    });
  }

  logout() {
    this.as.logout();
    this.router.navigate(['login']);
  }
  
  nav = document.querySelector('nav') as HTMLElement;
  toggledText = "Menu";

  toggleNav() {
    if(document.querySelector('nav') as HTMLElement){
      this.nav = document.querySelector('nav') as HTMLElement;
    }
    if(this.nav.classList.contains('close')){
      this.nav.classList.toggle('open');
      this.nav.classList.toggle('close');
      this.toggledText = "Close";
    }else{
      this.nav.classList.toggle('open');
      this.nav.classList.toggle('close');
      this.toggledText = "Menu";
    }
  }
}
