import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts : any = [];
  constructor(private http: HttpClient) { }

  getAll() {
    let url = 'http://localhost:8080/posts';
    let headers : any = {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*',
      // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
    return this.http.get(url, {headers}   
      ).pipe(map((response: any) => {
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
  }

  sendPost(post : string, file:File) {
    const formData = new FormData();
    formData.append("file", file);  
    formData.append("post", post); 
    formData.append("username", "username1");    
    let username = "username1";
    let url = `${environment.API_URL}/posts/new/?content=${post}&?username=${username}`   
    return this.http.post(url, formData)
  }

  sendLike(postId : number) {
    const formData = new FormData();
    formData.append("postId", postId.toString());      
    let username: any = sessionStorage.getItem('userToken');
    formData.append("username", username);
    let url = `${environment.API_URL}/likes/?id=${postId}&?username=${username}`   
    return this.http.post(url, formData)
  }

  deleteLike(postId: number) {
    const formData = new FormData();
    formData.append("postId", postId.toString());      
    let username: any = sessionStorage.getItem('userToken');
    formData.append("username", username);
    let url = `${environment.API_URL}/likes/?postId=${postId}&username=${username}`   
    return this.http.delete(url);
  }
}
