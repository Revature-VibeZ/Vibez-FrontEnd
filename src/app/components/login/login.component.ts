import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // loginForm: FormGroup;
    // loading = false;
    // isubmitted = false;
    // returnUrl: string;
    // error = '';
    form: any = {
      username: null,
      password: null
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
    if (this.authService.currentUserValue){
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
  const {username, password} = this.form;
        //this.submitted = true;

        // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //     return;
        // }

        //this.loading = true;
        this.authService.login(username, password)
            .pipe(first())
            .subscribe(
                data => {
                  this.isSuccessful = true;
                this.isSignInFailed = false;
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorMessage = error.message;
                    this.isSignInFailed = true;
                });
    }


  
}


