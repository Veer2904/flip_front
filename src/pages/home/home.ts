import { Component } from '@angular/core';
import { Header } from '../../Components/header/header';
import { Navbar } from '../../Components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header,Navbar,RouterOutlet],
   templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
