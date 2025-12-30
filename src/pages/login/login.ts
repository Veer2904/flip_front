import { Component, OnInit, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Auth/auth';
import {  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleAuth } from '../../Auth/google-auth';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements AfterViewInit {
  googleBtn = viewChild<ElementRef>('googleBtn');

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: Auth,
    private googleAuth : GoogleAuth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
  const el = this.googleBtn()?.nativeElement;
  if (!el) return;

  this.googleAuth.initGoogleLogin(this.onGoogleLogin.bind(this));
  this.googleAuth.renderButton(el);
}

  handleCredential(response: any) {
    console.log('Google JWT Token:', response.credential);

    // Send token to backend
    // this.http.post('/auth/google', { token: response.credential })
  }
  onGoogleLogin(response: any) {
    console.log('GOOGLE RESPONSE:', response);
    console.log('JWT:', response.credential);
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.auth.login(email, password).subscribe(() => {
        this.router.navigate(['home/products/Electronics']);
      });
    }
  }
  triggerGoogleLogin() {
  google.accounts.id.prompt();
}

}