import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<User[]>(`${environment.API_URL}/users`).subscribe((res: any) => {
            return res;
        });
    }


    uploadProfilePicture(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        let username: any = sessionStorage.getItem('userToken');
        console.log(username);
        let url = `${environment.API_URL}/users/?username=${username}`
        return this.http.put(url, formData);

    }

}