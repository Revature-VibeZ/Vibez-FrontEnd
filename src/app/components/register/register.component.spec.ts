import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let spy: any;
  var service: AuthService;
  let http: HttpClient;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ RegisterComponent  ],
      providers: [AuthService]
    });
    service = new AuthService(http,router);

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    });


  it('should call register method', () => {
    let user1 = { userId: 0, firstName: "test", lastname: "test", username:"user", password: "pass", email: "test@test.test", bio: "test"};

    spy = spyOn(service, 'register').and.callFake(()=>of(user1));
    service.register("test","test", "testUser", "test@email.com", "password");
    expect(service.register).toHaveBeenCalledTimes(1);
  });
});
