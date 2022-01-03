import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts = [];
  constructor(private http: HttpClient) { }

  getAll() {
    console.log('inside post service ts get all');

    let url = 'http://localhost:8080/posts';
    return this.http.get(url).pipe(map((response: any) => {
      console.log("getAll function!")
      console.log(response)
      this.posts = response;
    }));
  }

  create(body: any) {
    // update/remove hardcoded username later
    // let username = sessionStorage.getItem('usertoken')
    let username = "username1";
    let url = `http://localhost:8080/posts/?username=${username}`;
    return this.http.post(url, body).pipe(map((response: any) => {
      return response;
    }));
    // createBid(body: Bid) {
    //   let url = `http://localhost:8080/bids/`;
    //   return this.http.post(url, body).pipe(map((response: any) => {
    //     return response;
    //   }));
    // }

  }
}
