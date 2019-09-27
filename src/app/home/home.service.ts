import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/list`)
    .pipe(
      catchError((error) => {
        console.log('Erro na list: ', error);
        return throwError(error)
      })
    )
  }
}
