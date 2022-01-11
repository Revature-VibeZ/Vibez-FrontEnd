import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null,
  };
  isSuccessful = false;
  isSignInFailed = false;
  errorMessage = '';
  returnUrl: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('userToken')) {
      this.router.navigate(['/']);
    }
    
  }

  //This file contains login logic necessary for the login to succeed. It makes a call to authservice with provided username and password. Other functions in here are for current CSS styling to work correctly (Such as displaying just username first, and then displaying password to enter in after Username entered and cleared constraint check.)

  onSubmit() {
    const { username, password } = this.form;
    
    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.isSuccessful = true;
          this.isSignInFailed = false;
        },
        (error: { message: string }) => {
          this.errorMessage = error.message;
          this.isSignInFailed = true;
        }
      );
  }

  paperPlane = document.querySelector('.icon-paper-plane') as HTMLElement;
  usernameIcon() {
    this.paperPlane = document.querySelector(
      '.icon-paper-plane'
    ) as HTMLElement;
    this.paperPlane.classList.add('next');
    
  }
  usernameSwitch = document.querySelector('.username-section') as HTMLElement;
  passwordSection = document.querySelector('.password-section');
  usernameNext() {
    this.usernameSwitch = document.querySelector(
      '.username-section'
    ) as HTMLElement;
    this.usernameSwitch.classList.add('fold-up');
    this.passwordSection = document.querySelector(
      '.password-section'
    ) as HTMLElement;
    this.passwordSection.classList.remove('folded');
  }

  lock = document.querySelector('.icon-lock') as HTMLElement;
  passwordIcon() {
    this.lock = document.querySelector('.icon-lock') as HTMLElement;
    this.lock.classList.add('next');
    
  }
  
  successSection = document.querySelector('.success') as HTMLElement;
  passwordNext() {
    this.passwordSection = document.querySelector(
      '.password-section'
    ) as HTMLElement;
    this.successSection = document.querySelector('.success') as HTMLElement;
    this.onSubmit();
    if (this.isSignInFailed) {
      this.passwordSection.classList.add('fold-up');
    }
  }
  reload() {
    window.location.reload();
  }
}
