import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://127.0.0.1:8000/cart';
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) { console.log('🟢 CartService instance created', Math.random());}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or access_token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  loadCart() {
    this.getCart().subscribe({
      next: (items) => {
        console.log("Service emitted :")
        this.itemsSubject.next(items);
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.itemsSubject.next([]);
      }
    });
  }
  addToCart(product: product): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add`,
      {
        product_id: product.id,   // or ProductID (match backend)
        quantity: 1
      },
      {
        headers: this.getAuthHeaders()
      }
    );
  }
  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/show`, {
      headers: this.getAuthHeaders()
    }
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/remove/${productId}`,
      {
        headers: this.getAuthHeaders()
      },
    );
  }
}
