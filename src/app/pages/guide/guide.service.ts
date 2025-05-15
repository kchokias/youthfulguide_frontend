import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const GET_AVAILABILTY_DATES = 'https://youthfulguides.app/api/Availability/Guide/';
const UPDATE_AVAILABILITY = 'https://youthfulguides.app/api/Availability/Update/';
const REQUEST_BOOKING = 'https://youthfulguides.app/api/Request/';
const GET_AVAILABLE_GUIDES = 'https://youthfulguides.app/api/AvailableGuides/';
const GET_GUIDE_PROFILE_BY_ID = 'https://youthfulguides.app/api/GuideProfile/';
const GET_GUIDE_REVIEWS = 'https://youthfulguides.app/api/GuideReviews/';
const GET_GUIDE_BOOKINGS = 'https://youthfulguides.app/api/GuideBookings/';
const ACCEPT = 'https://youthfulguides.app/api/Accept';
const DECLINE = 'https://youthfulguides.app/api/Decline';
const CANCEL = 'https://youthfulguides.app/api/Cancel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GuideService {
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

  getGuideAvailability(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_AVAILABILTY_DATES}${id}`, { headers });
  }

  setAvailability(_guidId: number, _start:string, _end:string, _status:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      "guide_id": _guidId,
      "start_date": _start,
      "end_date": _end,
      "status": _status
    };

    return this.http.post(`${UPDATE_AVAILABILITY}`,
      data,
      { headers }
    );
  }

  requestBooking(_userId: number, _date:string, _guidId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      "guide_id": _guidId,
      "traveler_id": _userId,
      "date": _date
    };

    return this.http.post(`${REQUEST_BOOKING}`,
      data,
      { headers }
    );
  }

  acceptBooking(_booking_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      "booking_id": _booking_id};

    return this.http.post(`${ACCEPT}`,
      data,
      { headers }
    );
  }

  declineBooking(_booking_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      "booking_id": _booking_id};

    return this.http.post(`${DECLINE}`,
      data,
      { headers }
    );
  }

  cancelBooking(_booking_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      "booking_id": _booking_id};

    return this.http.post(`${CANCEL}`,
      data,
      { headers }
    );
  }

  getAvailableGuides(_start: string, _end: string, _region: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const params = new HttpParams()
      .set('start', _start)
      .set('end', _end)
      .set('region', _region);

    return this.http.get(GET_AVAILABLE_GUIDES, { headers, params });
  }

  geGuidesBookings(_start: string, _end: string, _confirmed: string, _pending: string, _completed: string, _guideId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const params = new HttpParams()
    .set('guide_id', _guideId)
    .set('start', _start)
    .set('end', _end)
    .set('confirmed', _confirmed)
    .set('pending', _pending)
    .set('completed', _completed);

    return this.http.get(GET_GUIDE_BOOKINGS, { headers, params });
  }

  getGuideProfileById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_GUIDE_PROFILE_BY_ID}${id}`, { headers });
  }

  getGuideReviews(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_GUIDE_REVIEWS}${id}`, { headers });
  }

}
