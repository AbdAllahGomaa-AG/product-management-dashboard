export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}
export interface CartItem extends Product {
  quantity: number;
}
// Products State
export interface ProductsState {
  list: Product[];
  categories: string[];
  category: string;
  filters: { category?: string; priceRange?: [number, number] };
  sort: 'asc' | 'desc';
  pagination: { page: number; pageSize: number };
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}
// Initial Products State
export const initialProductsState: ProductsState = {
  list: [],
  categories: [],
  category: '',
  filters: {},
  sort: 'asc',
  pagination: { page: 1, pageSize: 10 },
  loading: false,
  error: null,
  selectedProduct: null,
};


