import { Component } from '@angular/core';
import { Auth } from '../../Auth/auth';
import { Router,RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
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
