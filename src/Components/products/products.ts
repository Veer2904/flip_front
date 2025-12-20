import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Auth/auth';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
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
        this.loading = false;
      }
    });
  }
}

