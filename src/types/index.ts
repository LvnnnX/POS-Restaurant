export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  description?: string;
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'open' | 'paid' | 'cancelled';
  createdAt: Date;
}

export interface TaxConfig {
  rate: number;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}
