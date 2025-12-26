import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../Auth/cart';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

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
