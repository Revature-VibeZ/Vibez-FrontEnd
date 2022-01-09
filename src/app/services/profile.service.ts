import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  /*Retrieves an Observable JSON of type User from our DB. 
    Retrieves a specific user by their username passed in as a Request param
  */
  
}
