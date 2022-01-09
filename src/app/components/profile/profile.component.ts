import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isUser: boolean = true;
  username?: any;
  profile: User = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    profilePicture: '',
  };
  message: string = '';
  file?: File;

  constructor(
    private es: EventService,
    private router: Router,
    private us: UserService
  ) {}

  ngOnInit(): void {
    // this.determineUser();
    let username = sessionStorage.getItem('userToken');
    this.us.getUserByUsername(username).subscribe((res: User[]) => {
      this.profile = res[0];
    });
    this.es.uploadProfileImage$.subscribe((res: any) => {
      if (!this.profile) return;
      console.log('res: ', res);
      this.profile.profilePicture = res;
    });
  }

  update(password: string) {
    this.us.update(password).subscribe(Response);
  }

  // determineUser() {
  //   if (sessionStorage.getItem("username") === null) {
  //     this.username = sessionStorage.getItem("userToken")
  //     this.getProfile()
  //   }
  //   else if (sessionStorage.getItem("userToken") != null) {
  //     this.username = sessionStorage.getItem("username")
  //     this.isUser = false;
  //     this.getProfile()
  //   }
  //   else {
  //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //       this.router.navigate(['']);
  //     })
  //   }
  // }

  /*
  //Function to get the profile of the logged in user
  Retrieve the data on the requested user based on username inputted into the search bar
  Once the user is retrieved the sessionStorage is cleared so a new search may be preformed.
  */
  // getProfile() {
  //   this.us.getUserByUsername(this.username).subscribe((response) => {
  //     this.profile = response[0];
  //     sessionStorage.removeItem("username");
  //   })
  // }

  /*`
  Reloads the profile conponent without reloading the page.
  */
  // reloadProfile() {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['profile']);
  //   })
  // }

  uploadImage(event: any) {
    const Uploadedfile: File = event.target.files[0];
    if (Uploadedfile) {
      this.file = Uploadedfile;
      console.log('profile ts line 80');

      this.us.uploadProfilePicture(this.file).subscribe((res: any) => {
        console.log(res);
        
        // this.es.uploadProfileImage(response);
        console.log('afhiwuhefaiwuehf');
        
      });
    }
  }
}
