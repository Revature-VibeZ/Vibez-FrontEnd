import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';


const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}) 
  
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    var token = sessionStorage.getItem('currentUser');
    if (token == null){
      token = 'null'
    }
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }


  register(firstName: string, lastName: string, username: string, email: string, password: string): Observable<any> {

    return this.http.post(`${environment.API_URL}` + '/user', {
      
      firstName,
      lastName,
      username,
      password,
      email
      
      }, httpOptions);

  }
login(username: string, password: string) {
  return this.http.post<any>(`${environment.API_URL}` + '/auth', {username, password})
    .pipe(map(user => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      console.log(atob(sessionStorage.getItem('currentUser')!.split('.')[1]))
      let tokeninfo = atob(sessionStorage.getItem('currentUser')!.split('.')[1])
      console.log(tokeninfo.split('"')[3]);
      sessionStorage.setItem('userToken', tokeninfo.split('"')[3])
      this.currentUserSubject.next(user);
      return user;
    }));
}

logout() {
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('userToken');
  this.currentUserSubject.next(null);
}

}