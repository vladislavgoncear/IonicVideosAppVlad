import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/api'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) {}

  uploadVideo(video: File): Observable<any> {
    const formData = new FormData();
    formData.append('video', video);

    return this.http.post(`${this.apiUrl}/upload/video`, formData);
  }

  uploadPhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post(`${this.apiUrl}/upload/photo`, formData);
  }

  getVideos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/videos`);
  }

  getCredentials(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
}