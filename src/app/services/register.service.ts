import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  url = 'https://expensable-api.herokuapp.com//signup';

  register(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
}
