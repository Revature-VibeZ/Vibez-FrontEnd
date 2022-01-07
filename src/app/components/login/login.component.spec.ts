import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });



  it('should call login method', async(() => {
    let loginElement: DebugElement;
    const DebugElement = fixture.debugElement;
    let authService = DebugElement.injector.get(AuthService);
    let loginSpy = spyOn(authService, 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));
    component.form.controls['username'].setValue('username1');
    component.form.controls['password'].setValue('password');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalledTimes(1);
  }));
});
