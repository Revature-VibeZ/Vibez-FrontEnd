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

  // determineUser(){
  //   if (searched username = token or whatever info we have on current user){
  //     this.getProfile();
  //   }
  //   else{
  //     this.getOtherProfile();
  //   }
  // }

  determineUser(){
    if(sessionStorage.getItem("username") === null){
      this.getProfile()
    }
    else{
      this.getOtherProfile()
    }
  }


  //Object to recieve the JSON that will include all the user information
  profile?: any
  //Function to get the profile of the logged in user
  getProfile() {
    //To be replaced with a function call to retrieve the id of the logged in user
    let id = 1;
    //Preforms a get request on the id of the user and maps the response to this.profile
    this.profileService.getUserById(id).subscribe((response) => {
      this.profile = response;

    });

  }

  getOtherProfile() {
    let username: any = sessionStorage.getItem("username");
    this.profileService.getUserByUsername(username).subscribe((response) => {
      this.profile = response[0];
      sessionStorage.removeItem("username")
    });
  }

  reloadPage(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['profile']);
    })
  }



}
