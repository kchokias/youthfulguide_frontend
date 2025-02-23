import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://youthfulguides.app/api/User/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private serviceName: string = `LoginService`;

  constructor(private http: HttpClient) { }

  public login(data: {email: string, password: string}): Observable<any> {
    const functionName: string = `login`;
    const logPath: string = `/${this.serviceName}/${functionName}()`;
    // console.log(`${logPath}/ data`, data);

    return this.http.post(
      AUTH_API + 'Login',data,httpOptions
    );
  }

  public register(data: any): Observable<any> {
    const functionName: string = `register`;
    const logPath: string = `/${this.serviceName}/${functionName}()`;
    // console.log(`${logPath}/ data`, data);
    return this.http.post(
      AUTH_API + 'CreateNewUser',data,httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
