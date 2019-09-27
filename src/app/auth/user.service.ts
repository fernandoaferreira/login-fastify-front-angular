import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = 'http://localhost:3000';

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http
      .post<User>(`${this.url}/authenticate`, credentials)
      .pipe(
        tap(user => {
          localStorage.setItem('token', user.token);
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(user);
        }))
  };

  isAuthenticated(): Observable<Boolean> {
    return this.subjLoggedIn$.asObservable();
  };

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  };

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
