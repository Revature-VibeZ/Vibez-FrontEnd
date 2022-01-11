import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: any = [];
  constructor(private http: HttpClient) { }

  getAll() {
    console.log('inside post service ts get all');
    let url = `${environment.API_URL}/posts`;
    return this.http.get(url).pipe(map((res: any) => {      
      this.posts = res;
    }));
  }

  create(body: any) {
    let username: any = sessionStorage.getItem('userToken');
    let url = `${environment.API_URL}/posts/?username=${username}`;
    return this.http.post(url, body).pipe(map((response: any) => {
      return response;
    }));
  }

  sendPost(post: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("post", post);
    let username: any = sessionStorage.getItem('userToken');
    formData.append("username", username);
    let url = `${environment.API_URL}/posts/new/?content=${post}&?username=${username}`
    return this.http.post(url, formData)
  }

  sendLike(postId: number) {
    const formData = new FormData();
    formData.append("postId", postId.toString());      
    let username: any = sessionStorage.getItem('userToken');
    formData.append("username", username);
    formData.append("postId", postId.toString());
    let url = `${environment.API_URL}/likes/?id=${postId}&?username=${username}`
    return this.http.post(url, formData)
  }

  deleteLike(postId: number) {
    const formData = new FormData();
    formData.append("postId", postId.toString());      
    let username: any = sessionStorage.getItem('userToken');
    let url = `${environment.API_URL}/likes/?postId=${postId}&username=${username}`   
    return this.http.delete(url);
  }
}
