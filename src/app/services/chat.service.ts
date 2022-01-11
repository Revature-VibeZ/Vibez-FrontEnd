import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

//Function to get chatroom history.
  getChatHistory(): Observable<string[]>{
    return this.http.get(`${environment.API_URL}/chat`)
      .pipe(
        map(response => response as string[])
      )
  }
}
