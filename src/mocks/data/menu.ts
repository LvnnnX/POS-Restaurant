import type { Product } from '../../types'

export const menuItems: Product[] = [
  // Indonesian Appetizers
  { id: 'app-1', name: 'Keropok Udang', price: 25000, category: 'Appetizers', imageUrl: 'https://placehold.co/200x200?text=Keropok+Udang', isAvailable: true },
  { id: 'app-2', name: 'Lumpia Semarang', price: 20000, category: 'Appetizers', imageUrl: 'https://placehold.co/200x200?text=Lumpia', isAvailable: true },
  { id: 'app-3', name: 'Tahu Isi', price: 15000, category: 'Appetizers', imageUrl: 'https://placehold.co/200x200?text=Tahu+Isi', isAvailable: true },
  { id: 'app-4', name: 'Perkedel Jagung', price: 18000, category: 'Appetizers', imageUrl: 'https://placehold.co/200x200?text=Perkedel+Jagung', isAvailable: true },
  { id: 'app-5', name: 'Bala-Bala', price: 12000, category: 'Appetizers', imageUrl: 'https://placehold.co/200x200?text=Bala+Bala', isAvailable: true },
  
  // Indonesian Main Dishes
  { id: 'main-1', name: 'Nasi Gudeg', price: 35000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Nasi+Gudeg', isAvailable: true },
  { id: 'main-2', name: 'Rendang Daging', price: 45000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Rendang', isAvailable: true },
  { id: 'main-3', name: 'Ayam Bakar Taliwang', price: 40000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Ayam+Bakar', isAvailable: true },
  { id: 'main-4', name: 'Ikan Bakar Jimbaran', price: 42000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Ikan+Bakar', isAvailable: true },
  { id: 'main-5', name: 'Gado-Gado Jakarta', price: 28000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Gado+Gado', isAvailable: true },
  { id: 'main-6', name: 'Soto Betawi', price: 32000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Soto+Betawi', isAvailable: true },
  { id: 'main-7', name: 'Nasi Liwet Solo', price: 30000, category: 'Main Dishes', imageUrl: 'https://placehold.co/200x200?text=Nasi+Liwet', isAvailable: true },
  
  // Rice & Noodles
  { id: 'rice-1', name: 'Nasi Goreng Spesial', price: 25000, category: 'Rice & Noodles', imageUrl: 'https://placehold.co/200x200?text=Nasi+Goreng', isAvailable: true },
  { id: 'rice-2', name: 'Mie Ayam Pangsit', price: 22000, category: 'Rice & Noodles', imageUrl: 'https://placehold.co/200x200?text=Mie+Ayam', isAvailable: true },
  { id: 'rice-3', name: 'Kwetiau Goreng', price: 28000, category: 'Rice & Noodles', imageUrl: 'https://placehold.co/200x200?text=Kwetiau', isAvailable: true },
  { id: 'rice-4', name: 'Bihun Goreng Singapore', price: 26000, category: 'Rice & Noodles', imageUrl: 'https://placehold.co/200x200?text=Bihun', isAvailable: true },
  { id: 'rice-5', name: 'Nasi Kuning Komplit', price: 35000, category: 'Rice & Noodles', imageUrl: 'https://placehold.co/200x200?text=Nasi+Kuning', isAvailable: true },
  
  // Hot Beverages & Coffee
  { id: 'hot-1', name: 'Kopi Tubruk', price: 12000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Kopi+Tubruk', isAvailable: true },
  { id: 'hot-2', name: 'Kopi Luwak Premium', price: 45000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Kopi+Luwak', isAvailable: true },
  { id: 'hot-3', name: 'Teh Tarik', price: 15000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Teh+Tarik', isAvailable: true },
  { id: 'hot-4', name: 'Bajigur', price: 18000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Bajigur', isAvailable: true },
  { id: 'hot-5', name: 'Wedang Jahe', price: 14000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Wedang+Jahe', isAvailable: true },
  { id: 'hot-6', name: 'Cappuccino', price: 22000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Cappuccino', isAvailable: true },
  { id: 'hot-7', name: 'Espresso', price: 18000, category: 'Hot Beverages', imageUrl: 'https://placehold.co/200x200?text=Espresso', isAvailable: true },
  
  // Cold Beverages
  { id: 'cold-1', name: 'Es Teh Manis', price: 8000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Es+Teh', isAvailable: true },
  { id: 'cold-2', name: 'Es Jeruk', price: 12000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Es+Jeruk', isAvailable: true },
  { id: 'cold-3', name: 'Es Cendol', price: 15000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Es+Cendol', isAvailable: true },
  { id: 'cold-4', name: 'Es Campur', price: 18000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Es+Campur', isAvailable: true },
  { id: 'cold-5', name: 'Jus Alpukat', price: 16000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Jus+Alpukat', isAvailable: true },
  { id: 'cold-6', name: 'Es Kopi Susu', price: 20000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Es+Kopi+Susu', isAvailable: true },
  { id: 'cold-7', name: 'Iced Latte', price: 25000, category: 'Cold Beverages', imageUrl: 'https://placehold.co/200x200?text=Iced+Latte', isAvailable: true },
  
  // Traditional Desserts
  { id: 'des-1', name: 'Klepon', price: 12000, category: 'Desserts', imageUrl: 'https://placehold.co/200x200?text=Klepon', isAvailable: true },
  { id: 'des-2', name: 'Pisang Goreng', price: 10000, category: 'Desserts', imageUrl: 'https://placehold.co/200x200?text=Pisang+Goreng', isAvailable: true },
  { id: 'des-3', name: 'Kolak Pisang', price: 15000, category: 'Desserts', imageUrl: 'https://placehold.co/200x200?text=Kolak', isAvailable: true },
  { id: 'des-4', name: 'Puding Gula Merah', price: 18000, category: 'Desserts', imageUrl: 'https://placehold.co/200x200?text=Puding', isAvailable: true },
  { id: 'des-5', name: 'Es Krim Durian', price: 20000, category: 'Desserts', imageUrl: 'https://placehold.co/200x200?text=Es+Krim+Durian', isAvailable: true },
]
