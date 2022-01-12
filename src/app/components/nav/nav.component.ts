import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
declare function dragElement2(element: Element): void;

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

  mousePosition = {
    x: 0,
    y: 0
  };

  ngOnInit(): void {
    dragElement2(document.getElementById("draggableDiv1")!);
  }

  //Used for data binding on the search bar. Saves user input for use in profile search.
  search: string = '';

  //Function used to locate username from input provided by user.

  searchByUsername(username: string) {
    this.router.navigate(['/profile']);
    this.search = '';
    this.us.getUserByUsername(username).subscribe((res: any) => {
      if (res.length !== 1) return;
      this.es.searchProfile(res);
    });
  }

  /*
  Reloads the profile component without reloading the page.
  */
  loadProfile() {
    this.router.navigate(['/profile']);
    this.us.getUserByUsername(sessionStorage.getItem('userToken')).subscribe((res: any) => {
      if (res.length !== 1) return;
      this.es.searchProfile(res);
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

  toggleNav(e: MouseEvent) {
    if (!(this.mousePosition.x === e.screenX) || !(this.mousePosition.y === e.screenY)) {
      return;
    }
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

  onMouseDown(e: MouseEvent) {
    this.mousePosition.x = e.screenX;
    this.mousePosition.y = e.screenY;
  }
}
