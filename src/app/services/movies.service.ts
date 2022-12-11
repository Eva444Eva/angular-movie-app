import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

import { Helpers } from './helpers.service';
import { Director } from '../types/director.type';
import { Genre } from '../types/genre.type';
import { Movie } from '../types/movie.type';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(
    private http: HttpClient
  ) {}

  // all Movies
  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `${Helpers.API_URL}/movies`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // Movie by title
  public getMovie(title: string): Observable<Movie> {
    return this.http.get<Movie>(
      `${Helpers.API_URL}/movies/${encodeURIComponent(title)}`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // Movie director by name
  public getDirector(name: string): Observable<Director> {
    return this.http.get<Director>(
      `${Helpers.API_URL}/directors/${encodeURIComponent(name)}`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }

  // Movie genre by name
  public getGenre(name: string): Observable<Genre> {
    return this.http.get<Genre>(
      `${Helpers.API_URL}/genres/${encodeURIComponent(name)}`,
      {
        headers: new HttpHeaders().append(
          'Authorization', `Bearer ${localStorage.getItem('authToken')}`
        )
      }
    ).pipe(
      catchError(Helpers.handleHttpError)
    );
  }
}
