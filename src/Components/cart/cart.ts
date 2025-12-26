import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Auth/cart';
import { CartItem } from '../../models/cart-item.model';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartItems.reduce(
        (sum, items) => sum + (items.total || 0),
        0
      );
    });
    this.cartService.loadCart(); // 🔴 THIS loads the cart
  }
  removeitem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe();
  }
  cartitems() {
    this.cartService.loadCart();
  }

  isCartEmpty(): boolean {
    return !this.cartItems || this.cartItems.length === 0;
  }

  getValidCartItems(): CartItem[] {
    if (!this.cartItems) return [];
    return this.cartItems.filter((item: CartItem) => {
      return item && item.product_id !== undefined;
    });
  }
}
