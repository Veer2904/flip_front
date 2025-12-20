import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
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
        this.loading = false;
      }
    });
  }
}
