import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';

import { Helpers } from './helpers.service';
import { UserRegistration } from '../types/user-registration.type';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient
  ) {}

  public hello(): Observable<string> {
    return this.http.get(
      `${Helpers.API_URL}/hello`,
      { responseType: 'text' as const }
    )
    .pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User registration
  public register(userData: UserRegistration): Observable<User> {
    return this.http.post<User>(
      `${Helpers.API_URL}/users`,
      userData
    )
    .pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User login
  public login(email: string, password: string): Observable<{user: User, token: string}> {
    return this.http.post<{user: User, token: string}>(
      `${Helpers.API_URL}/login`,
      { email, password }
    ).pipe(
      catchError(Helpers.handleHttpError),
      tap(
        (response => {
          localStorage.setItem('userId', response.user.email);
          localStorage.setItem('authToken', response.token);
        })
      )
    );
  }

  // User data
  public getUser(): Observable<User> {
    return this.http.get<User>(
      `${Helpers.API_URL}/users/${localStorage.getItem('userId')}`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User update
  public updateUser(userData: {
    name?: string, 
    password?: string,
    birthday?: Date
  }): Observable<User> {
    return this.http.put<User>(
      `${Helpers.API_URL}/users/${localStorage.getItem('userId')}`,
      userData,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    )
    .pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User fav. movies
  public getFavoriteMovies(): Observable<string[]> {
    return this.getUser().pipe(
      map((user: User) => user.favoriteMovies)
    );
  }

  // User add fav. movie
  public addFavoriteMovie(movieId: string): Observable<User> {
    return this.http.put<User>(
      `${Helpers.API_URL}/users/${localStorage.getItem('userId')}/favorites`,
      { movieId },
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User remove fav. movie
  public removeFavoriteMovie(movieId: string): Observable<User> {
    return this.http.delete<User>(
      `${Helpers.API_URL}/users/${localStorage.getItem('userId')}/favorites`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        ),
        body: { movieId }
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // User delete
  public deleteUser(): Observable<string> {
    return this.http.delete(
      `${Helpers.API_URL}/users/${localStorage.getItem('userId')}`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        ),
        responseType: 'text' as const
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }
}
