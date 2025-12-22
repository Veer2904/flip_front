import { Component } from '@angular/core';
import { Header } from '../../Components/header/header';
import { Navbar } from '../../Components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-home',
<<<<<<< HEAD
  imports: [Header,Navbar,RouterOutlet],
=======
  imports: [Header,Navbar,RouterOutlet,CommonModule],
>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
