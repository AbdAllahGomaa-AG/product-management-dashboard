import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interface/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.API_URL;

  private http= inject(HttpClient)
  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }
  // Get product by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }
  // Get categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/products/categories`);
  }
  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products/category/${category}`);
  }
}
