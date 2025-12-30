import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  apiUrl = 'http://127.0.0.1:8000/auth/products';
  selectedFile!: File;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(2)]],
      Description: [''],
      Price: [0, [Validators.required, Validators.min(0)]],
      DiscountPrice: [null, Validators.min(0)],
      Stock: [0, [Validators.required, Validators.min(0)]],
      CategoryID: [1, Validators.required],
      Brand: [''],
      Rating: [null],
      ReviewsCount: [null],
      IsActive: [true]
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit() {
    if (this.productForm.invalid || !this.selectedFile) {
      alert('Please fill all required fields and select an image');
      return;
    }

    const formData = new FormData();

    formData.append('Title', this.productForm.value.Title);
    formData.append('Description', this.productForm.value.Description || '');
    formData.append('Price', this.productForm.value.Price.toString());
    formData.append('DiscountPrice', this.productForm.value.DiscountPrice ?? '');
    formData.append('Stock', this.productForm.value.Stock.toString());
    formData.append('CategoryID', this.productForm.value.CategoryID.toString());
    formData.append('Brand', this.productForm.value.Brand || '');
    formData.append('Rating', this.productForm.value.Rating ?? '');
    formData.append('ReviewsCount', this.productForm.value.ReviewsCount ?? '');
    formData.append('IsActive', this.productForm.value.IsActive ? '1' : '0');

    // ✅ ONLY file — backend creates ImageUrl
    formData.append('image', this.selectedFile);

    this.http.post(`${this.apiUrl}/add`, formData)
      .subscribe({
        next: () => {
          alert('Product added successfully');
          this.productForm.reset({ IsActive: true });
          this.selectedFile = undefined as any;
        },
        error: err => {
          console.error(err);
          alert('Failed to add product');
        }
      });
  }
}
