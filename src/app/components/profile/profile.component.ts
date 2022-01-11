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
  editMode: boolean = false;
  profile: any = {
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
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let username = sessionStorage.getItem('userToken');
    if (this.profile.username !== "") {
      this.us.getUserByUsername(username).subscribe((res: User[]) => {
        this.profile = res[0];
      });
    }

    this.es.uploadProfileImageEvent$.subscribe((res: any) => {
      if (!this.profile) return;
      this.profile.profilePicture = res;
    });
    this.es.searchProfileEvent$.subscribe((res: any) => {
      if (res.length !== 1) return;
      let loggedInUsername = sessionStorage.getItem('userToken')
      this.isUser = res[0].username === loggedInUsername;
      this.profile = res[0];
    })
  }

  password: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  bio: string = '';

  update(firstName: string, lastName: string, email: string, password: string, bio: string) {
    this.us.update(firstName, lastName, email, password, bio).subscribe(
      (res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['profile']);
        })
      });
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.bio = '';
  }

  changeToEditMode() {
    this.editMode = true;
  }
  uploadImage(event: any) {
    const Uploadedfile: File = event.target.files[0];
    if (Uploadedfile) {
      this.file = Uploadedfile;
      this.us.uploadProfilePicture(this.file).subscribe((res: any) => {
        this.es.uploadProfileImage(res.profilePicture);
      });
    }
  }
}