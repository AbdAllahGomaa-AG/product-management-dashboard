import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCategories,
  loadProducts,
} from 'src/app/store/products/products.actions';
import {
  selectProductList,
  selectCategories,
  selectSelectedCategory,
  selectProductsLoading,
  selectProductsError,
} from 'src/app/store/products/products.selectors';
import { Product, ProductsState } from 'src/app/core/interface/products.model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  // Dependencies
  private store = inject(Store<{ products: ProductsState }>);

  // Properties
  products$ = this.store.select(selectProductList);
  categories$ = this.store.select(selectCategories);
  selectedCategory$ = this.store.select(selectSelectedCategory);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  // Local variables
  products: Product[] = [];
  allFilteredProducts: Product[] = [];
  filteredProducts: Product[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  category = '';
  page = 1;
  limit = 10;
  totalPages = 0;
  loading = false;
  error = '';
  pages: number[] = [];

  ngOnInit(): void {
    // Load products
    this.loading = true;
    this.store.dispatch(loadProducts());


    this.products$.subscribe({
      next: (products) => {
        if (products.length > 0) {
          this.products = products;
          this.allFilteredProducts = products;
          this.loading = false;
          this.error = '';
          this.updateProductsAfterChange();

          console.log(products);
        }
      },
    });


    // Search products with debounce
    this.searchSubject.pipe(debounceTime(1000)).subscribe((term) => {
      this.searchProducts(term);
    });
  }

  // Get stars
  getStars(rate: number): number[] {
    return Array(Math.round(rate)).fill(0);
  }

  // Filter by category
  filterByCategory(): void {
    this.store.dispatch(getCategories());
    this.categories$.subscribe((res) => console.log(res));
  }

  // Set category
  setCategory(category: string): void {
    this.category = category;
    this.allFilteredProducts = this.products.filter(
      (product) => product.category === category,
    );
    this.updateProductsAfterChange();
  }

  // Clear filter
  clearFilter(): void {
    this.category = '';
    this.allFilteredProducts = [...this.products];
    this.updateProductsAfterChange();
  }

  // Sort products
  sortProducts(by: 'price' | 'title' | 'category', order: 'asc' | 'desc') {
    this.allFilteredProducts = [...this.allFilteredProducts].sort((a, b) => {
      let valueA: number | string;
      let valueB: number | string;

      switch (by) {
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'category':
          valueA = a.category.toLowerCase();
          valueB = b.category.toLowerCase();
          break;
        default:
          valueA = '';
          valueB = '';
      }

      return valueA < valueB
        ? order === 'asc'
          ? -1
          : 1
        : valueA > valueB
          ? order === 'asc'
            ? 1
            : -1
          : 0;
    });
    this.updateProductsAfterChange();
  }

  // Search products
  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  searchProducts(search: string): void {
    this.allFilteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
    this.updateProductsAfterChange();
  }

  // Pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.allFilteredProducts.length / this.limit);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.applyPagination();
  }

  applyPagination(): void {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.filteredProducts = this.allFilteredProducts.slice(start, end);
  }

  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.applyPagination();
  }

  updateProductsAfterChange(): void {
    this.page = 1;
    this.updatePagination();
  }

  //#region TrackBy
  // For skeletons & stars (just index)
  //eslint-disable-next-line
  trackBySkeleton(index: number, item: any): number {
    return index;
  }
  //eslint-disable-next-line
  trackByIndex(index: number, item: any): number {
    return index;
  }

  // For products
  trackByProduct(index: number, product: Product): number {
    return product.id; // assuming each product has unique id
  }

  // For pagination pages
  trackByPage(index: number, page: number): number {
    return page;
  }

  // For categories
  trackByCategory(index: number, category: string): string {
    return category;
  }

  // For stars
  trackByStar(index: number, star: number): number {
    return star;
  }
  //#endregion
}
