import { getTestBed, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientModule, RouterTestingModule,]
    });
    httpTestingController =
    TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
