import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';
import { Auth } from '../../Auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,  Header, RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  navigateToProducts() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['navbar/products']);
    } 
  }
}
