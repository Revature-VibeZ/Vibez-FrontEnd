import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.determineUser()
  }
  message: string = '';
  update(password: string) {
    this.profileService.update(password).subscribe(
      (Response)
    );
  }

  determineUser() {

    if (sessionStorage.getItem("username") === null) {
      this.username = sessionStorage.getItem("userToken")
      
      this.getProfile()
    }
    else if (sessionStorage.getItem("userToken") != null) {
      this.username = sessionStorage.getItem("username")
      this.isUser = false;
      this.getProfile()
    }
    else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
      })
    }
  }

  isUser: boolean = true;
  username?: any;
  //Object to recieve the JSON that will include all the user information
  profile?: any

  /*
  //Function to get the profile of the logged in user
  Retrieve the data on the requested user based on username inputted into the search bar
  Once the user is retrieved the sessionStorage is cleared so a new search may be preformed.
  */
  getProfile() {
    this.profileService.getUserByUsername(this.username).subscribe((response) => {
      this.profile = response[0];
      sessionStorage.removeItem("username");
    })
  }

  /*`
  Reloads the profile conponent without reloading the page.
  */
  reloadProfile() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    })
  }

  
}
