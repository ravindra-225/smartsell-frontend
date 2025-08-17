import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductComponent } from '../product';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category, Product } from '../product.model';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  productForm: FormGroup;
  error: string | null = null;
  image: File | null = null; // Store the selected image file
  imageInvalid: boolean = false;
  imageTouched: boolean = false;
  imagePreview: string | ArrayBuffer | null | undefined;
  categories: Category[] = [];
  loadingCategories = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductComponent,
    private userService: UserService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.maxLength(2000)]],
      price: [0, [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.loadCategories(); // Fetch categories on component init
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.error = null;
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded:', this.categories); // Debug log
        // Set a default category if available
        if (data.length > 0) {
          this.productForm.get('categoryId')?.setValue(data[0].id);
        }
        this.loadingCategories = false;
      },
      error: (err) => {
        console.error('Error fetching categories:', err); // Debug error
        this.error = 'Failed to load categories: ' + err.message;
        this.loadingCategories = false;
      },
    });
  }
  
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageInvalid = false;
      this.imageTouched = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(this.image);

    } else {
      this.image = null;
      this.imageInvalid = true;
      this.imageTouched = true;
      this.imagePreview = null;
    }
  }

 onSubmit(): void {
    if (this.productForm.valid && this.image) {
      const formData = new FormData();
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value || '');
      formData.append('price', this.productForm.get('price')?.value.toString());
      formData.append('location', this.productForm.get('location')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value.toString());
      formData.append('image', this.image); // Append the image file

      console.log('Form values:', this.productForm.value);
      console.log('Sending form data:', Array.from(formData.entries())); // Debug log
      this.productService.addProductWithImage(formData).subscribe({
        next: (response) => {
          console.log('Product added:', response);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Add product error:', err);
          this.error = err.error?.message || 'Failed to add product. Please check all fields and try again.';
        },
      });
    } else {
      console.log('Form is invalid:', this.productForm.errors, 'Image:', this.image);
      this.error = 'Please fill all required fields and upload an image.';
      this.imageInvalid = !this.image;
      this.imageTouched = true;
    }
  }
}