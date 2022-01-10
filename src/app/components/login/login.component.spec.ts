// import { HttpClientModule } from '@angular/common/http';
// import { Component, DebugElement } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from 'src/app/services/auth.service';

// import { LoginComponent } from './login.component';



// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let service: AuthService;
//   //let fixture: ComponentFixture<LoginComponent>;
//   //const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule],
//       // declarations: [ LoginComponent ],
//       // providers: [
//       //   {
//       //   provide: AuthService
//       //   // useValue: authServiceSpy
//       //   }
//       // ]

//     });
//    // fixture = TestBed.createComponent(LoginComponent);
//    formBuilder: new FormBuilder();
//    route: new ActivatedRoute();
//     router: new Router();
//     service = new AuthService();
//     component = new LoginComponent(FormBuilder, ActivatedRoute, Router, service);
//     // component = fixture.componentInstance;
//     // component.ngOnInit();
//   });

//   afterEach(() => {
//     service = null;
//     component = null;
//   });



//   it('should call login method', async(() => {
//     let user1 = { userId: 0, firstName: "test", lastname: "test", username:"user", password: "pass", email: "test@test.test", bio: "test", profilePic: null, token: null};
//     let loginElement: DebugElement;

//     spyOn(AuthService, 'login').and.returnValue(user1);


//     expect(component.isSuccessful()).toBe(true);
//   }));
// });
