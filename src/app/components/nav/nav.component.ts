import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
  }
  search: String = "";


  /*
  Saves username typed into search bar into the sessionStorage and then redirects to user profile.
  Will need some tweaking eventually.
  */
  searchByUsername(username: string) {
    sessionStorage.setItem("username", username);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    })
  }

  /*
  Reloads the profile conponent without reloading the page.
  */
  loadProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    })
  }

}
