import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService implements HttpInterceptor {
  url = 'https://expensable-api.herokuapp.com//';
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: `Token token=${this.token}`,
    });
    const reqClone = req.clone({
      headers,
    });
    return next.handle(reqClone);
  }

  get() {
    return this.http.get(`${this.url}categories`);
  }
  post(data: any) {
    return this.http.post(`${this.url}categories`, data);
  }
}
