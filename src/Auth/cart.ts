import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://127.0.0.1:8000';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /* ================= HELPER ================= */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /* ================= LOAD CART ================= */
  loadCart() {
  this.http.get<CartItem[]>(
    `${this.baseUrl}/cart`,
    { headers: this.getAuthHeaders() }
  ).subscribe({
    next: items => this.cartItemsSubject.next(items),
    error: err => {
      if (err.status === 401) {
        console.error('Unauthorized – token expired');
        this.cartItemsSubject.next([]);
        localStorage.removeItem('token');
      }
    }
  });
}


  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${this.baseUrl}/cart`,
      { headers: this.getAuthHeaders() }
    );
  }

  /* ================= ADD TO CART ================= */
  addToCart(productId: number) {
    this.http.post<CartItem>(
      `${this.baseUrl}/cart/add/${productId}`,
      {},
      { headers: this.getAuthHeaders() }
    ).subscribe(() => {
      this.loadCart(); // refresh instantly
    });
  }

  /* ================= REMOVE FROM CART ================= */
  removeItem(productId: number) {
    this.http.delete(
      `${this.baseUrl}/cart/remove/${productId}`,
      { headers: this.getAuthHeaders() }
    ).subscribe(() => {
      this.loadCart(); // refresh instantly
    });
  }
}
