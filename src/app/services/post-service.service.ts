import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  sendPost(post : string, file:File) {
    const formData = new FormData();
    formData.append("file", file);  
    formData.append("post", post); 
    formData.append("username", "username1");       
    return this.http.post(`${environment.API_URL}/post/new`, formData,  {
      headers: {    
      },
    })
  }
}
