import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://reqres.in/api/users';

  private usersCache = new Map<number, Observable<any>>();
  private userCache = new Map<number, Observable<any>>();

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();


  constructor(private http: HttpClient) { }


  getUsers(page: number): Observable<any> {
    if (!this.usersCache.has(page)) {
      const request$ = this.http.get<any>(`${this.API_URL}?page=${page}`).pipe(
        shareReplay(1), 
        catchError(error => {
          console.error('Error fetching users:', error);
          return of({ data: [], total: 0 }); 
        })
      );
      this.usersCache.set(page, request$);
    }
    return this.usersCache.get(page) || of({ data: [], total: 0 });
  }

  getUserById(id: number): Observable<any> {
    if (!this.userCache.has(id)) {
      const request$ = this.http.get<any>(`${this.API_URL}/${id}`).pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error fetching user:', error);
          return of({ data: null });
        })
      );
      this.userCache.set(id, request$);
    }
    return this.userCache.get(id) || of({ data: null });
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
}
