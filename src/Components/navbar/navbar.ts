import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
interface Product {
  ImageUrl: string;
  Title: string;
  Price: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {

  products: Product[] = [];
  apiUrl = 'http://127.0.0.1:8000/auth/products';
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onCategoryClick('Mobiles'); 
  }

  onCategoryClick(category: string) {
    this.loading = true;

    this.http
      .get<Product[]>(`${this.apiUrl}?category=${category}`)
      .subscribe({
        next: (data) => {
          this.products = [...data]; // 🔥 force new reference
          this.loading = true;
        },
        error: () => {
          this.products = [];
          this.loading = false;
        }
      });
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    console.log('Added to cart:', product);
  }

  trackByTitle(index: number, item: Product) {
    return item.Title;
  }
}
