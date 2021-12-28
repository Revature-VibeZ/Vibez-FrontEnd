import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  /*Retrieves an Observable JSON of type User from our DB. 
    Retrieves a specific user by their username passed in as a Request param
  */
  getUserByUsername(username: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/users?username=${username}`);
  }

  /*Retrieves an Observable JSON of type User from our DB. 
    Retrieves a specific user by their id passed in as a Path param
    */
  getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/users/${id}`);
  }





}
