import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Helpers {
  public static API_URL = 'https://movie-api-zbi4.onrender.com';

  public static handleHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    } 
    return throwError(() => new Error('Something unexpected happened; please try again later.'));
  }
}
