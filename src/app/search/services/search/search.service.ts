import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getUsers(params: HttpParams): Observable<any> {
    return this.http.get<any>([
      env.apiUrl,
      'search',
      'users'
    ].join('/'),
    { params });
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>([
        env.apiUrl,
        'users',
        username
      ].join('/'));
  }

  getUserStars(username: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>([
      env.apiUrl,
      'users',
      username,
      'starred'
    ].join('/'),
      { params, observe: 'response' });
  }

  parseUserTotalStars(header: string): number {
    const parts = header.split('&page=');
    const subParts = parts[parts.length - 1].split('>');
    return Number(subParts[0]);
  }
}
