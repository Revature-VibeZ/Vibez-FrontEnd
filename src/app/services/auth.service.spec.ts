import { getTestBed, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
<<<<<<< HEAD
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
=======
  let spy: any;
  

  beforeEach(() => {
    TestBed.configureTestingModule({

>>>>>>> e19dd00abc1cf27bc10797b84892fdd54d98d811
      imports: [HttpClientModule, RouterTestingModule,]

    });
    httpTestingController =
    TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () =>{

    service.logout();
    expect(sessionStorage.getItem('userToken')).toBeFalsy();
    expect(sessionStorage.getItem('currentUser')).toBeFalsy();
  })
  it('should call login method', () => {
    let user1 = { userId: 0, firstName: "test", lastname: "test", username:"user", password: "pass", email: "test@test.test", bio: "test"};


    spy = spyOn(service, 'login').and.callFake(()=>of(user1));
    service.login("username1","password");

    expect(service.login).toHaveBeenCalled();
  
  });

  // it('should login', () =>{
  //   service.login("username1","password");
  //   expect(sessionStorage.getItem('userToken')).toBeTruthy();
  //   expect(sessionStorage.getItem('currentUser')).toBeTruthy();
  // })

});


