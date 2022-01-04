import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts : any = [];
  constructor(private http: HttpClient) { }

  // login(data: any){
  //   return this.http.post(`http://localhost:8080/api/auth`, data, {
  //     headers: {'Content-type': 'application/json'},
  //     observe: 'response'
  //   }).pipe(
  //     map(response => {
  //       this.currentUser = response.body;
  //       console.log(this.currentUser);
  //       this.token = response.headers.get('Authorization') || '';
  //       localStorage.setItem("token", this.token);
  //       localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  //     })
  //   );
  // }


  getAll() {
    console.log('inside post service ts get all');

    let url = 'http://localhost:8080/posts';
    let headers : any = {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
    return this.http.get(url, {headers}   
      ).pipe(map((response: any) => {
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
