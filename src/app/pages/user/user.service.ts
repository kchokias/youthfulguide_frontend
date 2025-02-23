import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_USER_BY_ID_API = 'https://youthfulguides.app/api/User/GetUserByUserId/';
const PATCH_USER_BY_ID_API = 'https://youthfulguides.app/api/User/UpdateUser/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private serviceName: string = `UserService`;
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9obmRvZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDMyMTAyNiwiZXhwIjoxNzQwMzI0NjI2fQ.l8RLGmRzYQsqwLdSig35hlCXY7brVXVuZEKc4EMpGeU';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(`${GET_USER_BY_ID_API}${id}`, { headers });
  }

  patchUserById(id: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(`${PATCH_USER_BY_ID_API}${id}`, userData, { headers });
  }
}
