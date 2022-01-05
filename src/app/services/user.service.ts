import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {}

    getAll() {
        this.http.get<User[]>(`${environment.API_URL}/users`).subscribe((res: any) => {
            return res;
        });
    }
}