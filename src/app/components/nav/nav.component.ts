import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private as: AuthService,
    private us: UserService,
    private es: EventService
  ) { }

  ngOnInit(): void { }

  //Used for data binding on the search bar. Saves user input for use in profile search.
  search: string = '';

  searchByUsername(username: string) {
    this.us.getUserByUsername(username).subscribe((res: any) => {
      if(res.length !== 1) return;
      this.es.searchProfile(res);
      this.search = '';
      this.router.navigate(['/profile']);
    });
  }

  /*
  Reloads the profile component without reloading the page.
  */
  loadProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    });
  }
  /*
    Reloads the Post Feed component without reloading the page.
  */
  loadPostFeed() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['postfeed']);
    });
  }
  /*
    Calls the AuthService function logout which clears out the user's token
    and then redirects them to the login screen.
  */
  logout() {
    this.as.logout();
    this.router.navigate(['/login']);
  }

  nav = document.querySelector('menu') as HTMLElement;
  toggledText = "Menu";

  toggleNav() {
    if (document.querySelector('menu') as HTMLElement) {
      this.nav = document.querySelector('menu') as HTMLElement;
    }
    if (this.nav.classList.contains('close')) {
      this.nav.classList.toggle('open');
      this.nav.classList.toggle('close');
      this.toggledText = "Close";
    } else {
      this.nav.classList.toggle('open');
      this.nav.classList.toggle('close');
      this.toggledText = "Menu";
    }
  }
}
