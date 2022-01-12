import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    this.http
      .get<User[]>(`${environment.API_URL}/users`)
      .subscribe((res: any) => {        
        return res;
      });
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/users?username=${username}`)
      .pipe(
        map((res: any) => {        
          
          return res;
        })
      );
  }

  /*Retrieves an Observable JSON of type User from our DB. 
        Retrieves a specific user by their id passed in as a Path param
        */
  getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/users/${id}`);
  }

  update(firstName: string, lastName: string, password: string, email: string, bio: string) {
    var username = sessionStorage.getItem('userToken')!;
    let currentUser: any = { username, password, firstName, lastName, email, bio }
    return this.http.put(`${environment.API_URL}/users/update`, currentUser);
  }

  uploadProfilePicture(file: File){
    const formData = new FormData();
    formData.append('file', file);
    let username: any = sessionStorage.getItem('userToken');
    formData.append('username', username);
    let url = `${environment.API_URL}/users`;
    return this.http.put(url, formData);
  }
}
