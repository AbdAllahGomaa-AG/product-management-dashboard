import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/interface/products.model';

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

@Injectable({ providedIn: 'root' })
export class ProductCacheService {
  private productListCache: CacheEntry<Product[]> | null = null;
  private ttl = 5 * 60 * 1000; // 5 دقائق

  getList(): Product[] | null {
    if (!this.productListCache) return null;
    if (Date.now() > this.productListCache.expiry) {
      this.productListCache = null;
      return null;
    }
    return this.productListCache.value;
  }

  setList(products: Product[]) {
    this.productListCache = { value: products, expiry: Date.now() + this.ttl };
  }
}
