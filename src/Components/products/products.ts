import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription, switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../Auth/cart';
import { Product } from '../../models/products';
import { product } from '../../models/product.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: any[] = [];
  loading = false;
  showPopup = false;
  apiUrl = 'http://127.0.0.1:8000/auth/products';

  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
  this.sub = combineLatest([
    this.route.paramMap,
    this.route.queryParams
  ]).pipe(
    switchMap(([params, query]) => {
      this.loading = true;

      const category = params.get('category');
      const search = query['search'];

      const httpParams: any = {};
      if (category) httpParams.category = category;
      if (search) httpParams.search = search;

      return this.http.get<any[]>(this.apiUrl, {
        params: httpParams
      });
    })
  ).subscribe({
    next: data => {
      this.products = data;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: err => {
      console.error(err);
      this.products = [];
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}
  addToCart(product: Product) {
    // Map the Product to the expected product type
    const cartProduct: product = {
      id: product.ProductID,
      Title: product.Title,
      Price: product.Price,
      ImageUrl: product.ImageUrl || '' // Provide a default empty string if ImageUrl is undefined
    };

    this.cartService.addToCart(cartProduct).subscribe({
      next: () => {
        alert("Product Added to Cart Successfully");
      },
      error: (err: any) => {
        alert("Failed to add product to cart");
      }
    });
  }
  openPopup(){
    this.showPopup = true;
  }
  closePopup(){
    this.showPopup=false;
  }  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}