import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


const GET_AVAILABILTY_DATES = 'https://youthfulguides.app/api/Availability/Guide/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private tokenKey = 'authToken';

  private serviceName: string = `BookingService`;

  constructor(private router: Router,private http: HttpClient) {}

  private getDeviceToken(): string | null {
    const functionName: string = `getDeviceToken`;
    const logPath: string = `/${this.serviceName}/${functionName}()`;
    // console.log(`${logPath}/`);

    return localStorage.getItem('authToken');
  }

  public getAuthHeader(): string {
    const token: string | null = this.getDeviceToken();
    const header: string = `Bearer ${token}`;

    return header;
  }

  getGuideAvailability(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_AVAILABILTY_DATES}${id}`, { headers });
  }

}
