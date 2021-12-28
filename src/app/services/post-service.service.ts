import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  sendPost(post : string) {

    let postInfo = `post=${post}`
    
    return this.http.post(`${environment.API_URL}/post`, postInfo,  {
      headers: {
      // leverages form params to not expose credentials to the url
        'Content-type': 'application/x-www-form-urlencoded'
      },
    })
  }
}
