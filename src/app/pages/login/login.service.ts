import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private serviceName: string = `LoginService`;
  private serverUrl: string =  `https://youthfulguides.app`
  private loginUrl: string = `/api/User/Login`;

  constructor(private http: HttpClient) { }

  public getDeviceTokenRequest(data: {email: string, password: string}): Observable<any> {
    const functionName: string = `getDeviceTokenRequest`;
    const logPath: string = `/${this.serviceName}/${functionName}()`;
    console.log(`${logPath}/ data $0`, data);
    console.log('Request URL: $0', this.serverUrl + this.loginUrl);

    return this.http.get<any>(
      this.serverUrl+this.loginUrl,
      // `${environment.apiUrl}/api/v0/staff/web/user/device-token?name=angular`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'Application/json',
          // 'Authorization': 'Basic ' + btoa(`${data.email}:${data.password}`),
        }),
      }
    );
  }
}
