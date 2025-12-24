import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../Auth/cart';
import { CartItem } from '../../models/cart-item';
import { RouterLink } from '@angular/router';

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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');

    if (this.isLoggedIn) {
      this.cartService.cartItems$.subscribe((items: CartItem[]) => {
        this.cartCount = items.reduce(
          (sum, item) => sum + item.Quantity,
          0
        );
      });

      this.cartService.loadCart();
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
