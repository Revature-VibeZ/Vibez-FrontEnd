import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

//This auth service is responsible for making HTTP calls for login/register and also declaring logout functionality. It also sets up a Behaviorsubject on the user as well, so other components can observe the object but not change the state of the object (to monitor login/logouts)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })

};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  isLoggedIn: Boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    var token = sessionStorage.getItem('currentUser');
    if (token == null) {
      token = 'null'
    }
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  register(firstName: string, lastName: string, username: string, email: string, password: string): Observable<any> {

    return this.http.post(`${environment.API_URL}` + '/users', {

      firstName,
      lastName,
      username,
      password,
      email

    }, httpOptions);

  }
  //atob is responsible for decoding the JWT token. This function sends user data in, receives JWT token from backend, and assigns a decoded version of the key to user session storage.
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.API_URL}` + '/auth', { username, password })
      .pipe(map(user => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        let tokeninfo = atob(sessionStorage.getItem('currentUser')!.split('.')[1])
        sessionStorage.setItem('userToken', tokeninfo.split('"')[3])
        this.currentUserSubject.next(user);
        this.router.navigate(['']);
        return user;
      }));
  }


  //On log out, this sets behaviorsubject as null and removes session storage items.
  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

}
// 