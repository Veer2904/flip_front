import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface data {
  FullName: string,
  Email: string,
  MobileNumber: string,
  Password: string
}
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://127.0.0.1:8000/auth';
  constructor(private http: HttpClient) { }

  register(data: {
    FullName: string,
    Email: string,
    MobileNumber: string,
    Password: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);        // MUST be username
    body.set('password', password);
    body.set('grant_type', 'password'); // IMPORTANT (prevents 401 in many cases)
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });
  
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      body.toString(),
      { headers }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.access_token);
      })
    );
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token')
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }
}


