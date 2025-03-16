import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const GET_PROFILE_USER_BY_ID_API = 'https://youthfulguides.app/api/User/GetUserByUserId/';
const GET_USER_ID_API = 'https://youthfulguides.app/api/User/GetUserIdFromToken';
const PATCH_USER_BY_ID_API = 'https://youthfulguides.app/api/User/UpdateUser/';
const UPLOAD_PROFILE_PHOTO = 'https://youthfulguides.app/api/User/UploadProfilePhoto';
const UPLOAD_GUIDE_MEDIA = 'https://youthfulguides.app/api/Guide/UploadMedia';
const GET_PROFILE_PHOTO = 'https://youthfulguides.app/api/User/GetProfilePhoto/';
const GET_GUIDE_MEDIA = 'https://youthfulguides.app/api/Guide/GetAllMedia/';
const DELETE_MEDIA_PHOTO = 'https://youthfulguides.app/api/Guide/DeleteMedia/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private serviceName: string = `UserService`;

  constructor(private http: HttpClient) { }

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

  getUserProfileById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_PROFILE_USER_BY_ID_API}${id}`, { headers });
  }

  getGuideMedia(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_GUIDE_MEDIA}${id}`, { headers });
  }

  deleteMediaPhoto(photoId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.delete(`${DELETE_MEDIA_PHOTO}${photoId}`, { headers });
  }

  postUserProfilePhoto(id: number, photoData: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      photoData: photoData
    };

    return this.http.post(`${UPLOAD_PROFILE_PHOTO}`,
      data,
      { headers }
    );
  }

  postGuideMedia(id: number, guideMedia: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    const data = {
      guideId: id,
      mediaData: guideMedia
    };

    return this.http.post(`${UPLOAD_GUIDE_MEDIA}`,
      data,
      { headers }
    );
  }

  getUserProfilePhoto(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_PROFILE_PHOTO}${id}`, { headers });
  }

  getUserId(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.get(`${GET_USER_ID_API}`, { headers });
  }

  patchUserById(id: number, userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getAuthHeader(),
    });

    return this.http.put(`${PATCH_USER_BY_ID_API}${id}`, userData, { headers });
  }
}
