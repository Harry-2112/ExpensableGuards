import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }
  get isLogget(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  url = 'https://expensable-api.herokuapp.com//';

  login(authData: any): Observable<any | void> {
    return this.http.post(this.url + '/login', authData).pipe(
      map((res: any) => {
        this.saveToken(res.token, res.first_name, res.last_name, res.email);
        this.loggedIn.next(true);
        return res;
        //sabe token
      }),
      catchError((err) => this.habdlerError(err))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.loggedIn.next(false);
  }

  private checkToken() {
    const userToken = localStorage.getItem('token');
    let isExpired = null;
    userToken == null ? (isExpired = true) : (isExpired = false);
    isExpired ? this.logout() : this.loggedIn.next(true);
    return isExpired;
  }
  Comprobar() {
    let res = this.checkToken();
    return res;
  }
  private saveToken(
    token: string,
    first_name: string,
    last_name: string,
    email: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', `${first_name} ${last_name}`);
    localStorage.setItem('email', email);
  }
  private habdlerError(err: any): Observable<never> {
    let errorMessage = 'An error occurred retriveng data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
