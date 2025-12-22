import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Auth/auth';

export interface registerform{
  FullName: string
  Email : string
  MobileNumber : string
  Password : string
<<<<<<< HEAD
  
=======
>>>>>>> a4ddc96ce5056c9427155f87781efaf58a6f613c
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerform!: FormGroup ;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth:Auth
  ) {}

  ngOnInit(): void {
    this.registerform = this.fb.group({
      FullName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }
    const payload ={
      FullName : this.registerform.value.FullName,
      Email : this.registerform.value.Email,
      MobileNumber : this.registerform.value.MobileNumber,
      Password : this.registerform.value.Password
    }
    this.auth.register(payload).subscribe({
      next:()=>{
        alert("Register Successfull.....!")
        this.router.navigate([''])
      },
      error:(err)=>{
        console.error;
        alert(err.error?.detail || "Registration Failed....?")
      }
    })
    }
  }
