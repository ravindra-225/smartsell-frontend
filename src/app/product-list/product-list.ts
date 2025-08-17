import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from '../product';
import { Product } from '../product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-list',
 standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  searchForm: FormGroup;
  error: string | null = null;
  loading: boolean = false;

  constructor(private productService: ProductComponent, private fb: FormBuilder, public authService: AuthService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(keyword?: string): void {
    this.loading = true;
    this.error = null;
    const observable = keyword
      ? this.productService.searchProducts(keyword)
      : this.productService.getProducts();
    observable.subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products fetched:', this.products);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      },    });
  }

  onSearch(): void {
    const keyword = this.searchForm.get('keyword')?.value;
    this.loadProducts(keyword);
  }

  viewProduct(id: number): void {
    // Implement navigation to product details page
    this.router.navigate([`/product/${id}`]); // Example route
  }
}