import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../Auth/cart';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  searchText = '';
  cartCount = 0;
  isLoggedIn = false;
  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');

    if (this.isLoggedIn) {
      this.cartSubscription = this.cartService.items$.subscribe((items: any[]) => {
        this.cartCount = items.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );
      });
    }
  }
  onSearch(){
    if(!this.searchText.trim()) return;
    this.router.navigate(
      ['/home/products'],
      { queryParams: { search: this.searchText } }
    );
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
