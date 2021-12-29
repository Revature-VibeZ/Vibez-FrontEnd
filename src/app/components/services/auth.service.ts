import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}) 
  
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(firstName: string, lastName: string, username: string, email: string, password: string): Observable<any> {

    return this.http.post(`${environment.API_URL}` + '/user', {
      
      firstName,
      lastName,
      username,
      password,
      email
      
      }, httpOptions);

  }
}
