import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts = [];
  constructor(private http: HttpClient) { }

  getAll(){
    console.log('inside post service ts get all');
    
    let url = 'http://localhost:8080/posts';
    return this.http.get(url).pipe(map((response: any) => {
      console.log("getAll function!")
      console.log(response)
      this.posts = response;
    }));
  }
}
