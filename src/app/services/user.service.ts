import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}