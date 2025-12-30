import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Auth/cart';
import { CartItem } from '../../models/cart-item.model';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  filteredCartItems: CartItem[] = [];
  total = 0;

  private sub!: Subscription;

  constructor(
    private cartService: CartService,
    private cdr : ChangeDetectorRef
  ) { console.log('🧩 CartComponent got CartService', cartService); }

  ngOnInit(): void {
    this.sub = this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.filteredCartItems = items;
      this.calculateTotal();
      this.cdr.detectChanges();
    });
    this.cartService.loadCart();
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadCart(): void {
    this.cartService.loadCart();
  }
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.cartService.loadCart();
      },
      error: err => console.error('error removing item : ', err)
    });
  }
  encodeImageUrl(url: string): string {
    if (!url) {
      return 'assets/no-image.png';
    }
    return encodeURI(url);
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
  }
}
