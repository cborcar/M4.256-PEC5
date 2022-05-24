import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getAllImages(): Observable<Object> {
    return this.http.get<Object>('https://myfakeapi.com/api/football/stadiums');
  }

  getImageById(id: string): Observable<Object> {
    return this.http.get<Object>(
      'https://myfakeapi.com/api/football/stadiums/' + id
    );
  }
}
