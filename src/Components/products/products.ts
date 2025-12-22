import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
=======
import { Auth } from '../../Auth/auth';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
<<<<<<< HEAD
export class ProductComponent implements OnInit {

  products: any[] = [];
  loading: boolean = false;   // ✅ ADD THIS
  apiUrl = 'http://127.0.0.1:8000/auth/products';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      this.loadProducts(category);
    });
  }

  loadProducts(category: string | null) {
    // this.loading = true;

    const url = category
      ? `${this.apiUrl}?category=${category}`
      : this.apiUrl;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.products = [];
=======
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private auth: Auth) { }

  ngOnInit(): void {

    // console.log('Fetching products...');
    this.auth.getProducts().subscribe({
      next: (data) => {
        // console.log('Products received:', data);
        this.products = data;
        this.loading = true;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        console.error('Error details:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          error: err.error
        });
>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
        this.loading = false;
      }
    });
  }
}
<<<<<<< HEAD
=======

>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
