import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

const GET_TRAVELER_BOOKINGS = 'https://youthfulguides.app/api/TravelerBookings/';
const REVIEW_BOOKING = 'https://youthfulguides.app/api/Traveler/LeaveReview/';
const GET_TRAVELER_PROFILE_BY_ID = 'https://youthfulguides.app/api/TravelerProfile/';
const CANCEL = 'https://youthfulguides.app/api/Traveler/CancelBooking/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class TravelerService {
  private tokenKey = 'authToken';

  private serviceName: string = `GuideService`;

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

  getTravelerBookings(_start: string, _end: string, _confirmed: string, _pending: string, _completed: string, _travelerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const params = new HttpParams()
    .set('traveler_id', _travelerId)
    .set('start', _start)
    .set('end', _end)
    .set('confirmed', _confirmed)
    .set('pending', _pending)
    .set('completed', _completed);

    return this.http.get(GET_TRAVELER_BOOKINGS, { headers, params });
  }

  cancelBooking(_booking_id: number, _traveler_id: number): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeader(),
      });

      const data = {
        "booking_id": _booking_id,
        "traveler_id": _traveler_id
      };

      return this.http.post(`${CANCEL}`,
        data,
        { headers }
      );
  }

  reviewBooking(_booking_id: number, _traveler_id: number, _rate: number, _review:string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getAuthHeader(),
      });

      const data = {
        "booking_id": _booking_id,
        "traveler_id": _traveler_id,
        "rate": _rate,
        "review": _review
      };

      return this.http.post(`${REVIEW_BOOKING}`,
        data,
        { headers }
      );
  }

  getTravelerProfileById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });
    return this.http.get(`${GET_TRAVELER_PROFILE_BY_ID}${id}`, { headers });
  }
}
