
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Product } from './product.model';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductComponent {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Token in getHeaders:', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/categories`, { headers: this.getHeaders() });
  }

addProductWithImage(formData: FormData): Observable<Product> {
  const token = this.authService.getToken();
  let headers = new HttpHeaders();

   if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post<Product>(this.apiUrl, formData, { headers });
}

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
}