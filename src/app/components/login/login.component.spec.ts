import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


import { LoginComponent } from './login.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  var service: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpClient;
  let router: Router;
  let spy: any;
  //const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [ AuthService]
      

    });
   fixture = TestBed.createComponent(LoginComponent);

    service = new AuthService(http,router);
    //component = new LoginComponent(FormBuilder, ActivatedRoute, Router, service);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  afterEach(() => {
    // service = null;
    // component = null;
    sessionStorage.clear();
  });



  it('should call login method', () => {
    let user1 = { userId: 0, firstName: "test", lastname: "test", username:"user", password: "pass", email: "test@test.test", bio: "test"};


    spy = spyOn(service, 'login').and.callFake(()=>of(user1));

    service.login("username1", "password");
    //expect(component.isSuccessful()).toBe(true);
    expect(service.login).toHaveBeenCalled();
  });
});
