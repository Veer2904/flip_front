import { Component } from '@angular/core';
import { Auth } from '../../Auth/auth';
import { Router,RouterLink } from '@angular/router';
<<<<<<< HEAD
@Component({
  selector: 'app-header',
  standalone: true,
=======

@Component({
  selector: 'app-header',
>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private auth: Auth,
    private router : Router
  ){}
  logout(){
    this.auth.logout()
    this.router.navigate([''])
  }
}
