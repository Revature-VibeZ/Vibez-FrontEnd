import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(){
    const { firstName, lastName, userName, email, password } = this.form;

    console.log(this.form);
    console.log('Username: ' + userName + ' Password: ' + password);

    this.authService
      .register(firstName, lastName, userName, email, password)
      .subscribe({
        next: (data) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (err) => {
          this.isSignUpFailed = true;
          this.errorMessage = err.message;
          
        },
      });
  }

  iconFirstname: any;
  firstnameIcon() {
    this.iconFirstname = document.querySelector(
      '.icon-firstname'
    ) as HTMLElement;
    this.iconFirstname.classList.add('next');
    console.log('firstname');
  }
  firstnameSection: any;
  lastnameSection: any;
  firstnameNext() {
    this.firstnameSection = document.querySelector(
      '.firstname-section'
    ) as HTMLElement;
    this.firstnameSection.classList.add('fold-up');
    this.lastnameSection = document.querySelector(
      '.lastname-section'
    ) as HTMLElement;
    this.lastnameSection.classList.remove('folded');
  }

  iconLastname: any;
  lastnameIcon() {
    this.iconLastname = document.querySelector(
      '.icon-lastname'
    ) as HTMLElement;
    this.iconLastname.classList.add('next');
    console.log('firstname');
  }
  
  usernameSwitch = document.querySelector('.username-section') as HTMLElement;
  lastnameNext() {
    this.firstnameSection = document.querySelector(
      '.firstname-section'
    ) as HTMLElement;
    this.firstnameSection.classList.add('fold-up');
    this.usernameSwitch = document.querySelector(
      '.username-section'
    ) as HTMLElement;
    this.usernameSwitch.classList.remove('folded');
  }

  paperPlane = document.querySelector('.icon-paper-plane') as HTMLElement;
  usernameIcon() {
    this.paperPlane = document.querySelector(
      '.icon-paper-plane'
    ) as HTMLElement;
    this.paperPlane.classList.add('next');
    console.log('paper plane');
  }

  passwordSection: any;
  emailSection: any;
  usernameNext() {
    this.usernameSwitch = document.querySelector(
      '.username-section'
    ) as HTMLElement;
    this.usernameSwitch.classList.add('fold-up');
    this.emailSection = document.querySelector(
      '.email-section'
    ) as HTMLElement;
    this.emailSection.classList.remove('folded');
  }

  iconEmail: any;
  emailIcon() {
    this.iconEmail = document.querySelector(
      '.icon-email'
    ) as HTMLElement;
    this.iconEmail.classList.add('next');
    console.log('email');
  }
  
  emailNext() {
    this.emailSection = document.querySelector(
      '.email-section'
    ) as HTMLElement;
    this.emailSection.classList.add('fold-up');
    this.passwordSection = document.querySelector(
      '.password-section'
    ) as HTMLElement;
    this.passwordSection.classList.remove('folded');
  }

  lock = document.querySelector('.icon-lock') as HTMLElement;
  passwordIcon() {
    this.lock = document.querySelector('.icon-lock') as HTMLElement;
    this.lock.classList.add('next');
    console.log('lock');
  }
  successSection = document.querySelector('.success') as HTMLElement;
  passwordNext() {
    this.passwordSection = document.querySelector(
      '.password-section'
    ) as HTMLElement;
    this.successSection = document.querySelector('.success') as HTMLElement;
    this.onSubmit();
    console.log(this.isSignUpFailed);
    if (this.isSignUpFailed) {
      this.passwordSection.classList.add('fold-up');
    }
  }
  reload() {
    window.location.reload();
  }
}
