import { HttpClientModule } from '@angular/common/http';

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';


import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ RegisterComponent  ],
      providers: [AuthService]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    });


  it('should call register method', async(() => {
    let registerElement: DebugElement;
    const DebugElement = fixture.debugElement;
    let authservice = DebugElement.injector.get(AuthService);
    let registerSpy = spyOn(authservice, 'register').and.callThrough();
    registerElement = fixture.debugElement.query(By.css('form'));
    component.form.controls['firstName'].setValue('first');
    component.form.controls['lastName'].setValue('last');
    component.form.controls['userName'].setValue('user');
    component.form.controls['email'].setValue('email');
    component.form.controls['password'].setValue('pass');
    registerElement.triggerEventHandler('ngSubmit', null);
    expect(registerSpy).toHaveBeenCalledTimes(1);
  }));
});
