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
  // loginForm: FormGroup;
  // loading = false;
  // isubmitted = false;
  // returnUrl: string;
  // error = '';
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
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //get f() { return this.loginForm.controls; }

  onSubmit() {
    const { username, password } = this.form;
    //this.submitted = true;
    console.log(this.form);
    console.log('Username: ' + username + ' Password: ' + password);
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    //this.loading = true;
    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.isSuccessful = true;
          this.isSignInFailed = false;
          //this.router.navigate([this.returnUrl]);
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
    console.log('paper plane');
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
    console.log('lock');
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
