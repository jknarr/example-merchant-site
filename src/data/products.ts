import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for travel, work, or everyday listening.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/prod1/600/400',
    rating: 4.7,
    reviewCount: 1243,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description:
      'Stay connected and track your health with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and a beautiful AMOLED display.',
    price: 399.99,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/prod2/600/400',
    rating: 4.5,
    reviewCount: 876,
    inStock: true,
  },
  {
    id: '3',
    name: 'Mechanical Gaming Keyboard',
    description:
      'RGB mechanical keyboard with Cherry MX switches, per-key customizable lighting, and a durable aluminum frame built for serious gamers.',
    price: 149.99,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/prod3/600/400',
    rating: 4.6,
    reviewCount: 532,
    inStock: true,
  },
  {
    id: '4',
    name: 'Portable Bluetooth Speaker',
    description:
      'Waterproof, dustproof speaker with 360° surround sound, 24-hour battery life, and a rugged design for outdoor adventures.',
    price: 89.99,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/prod4/600/400',
    rating: 4.4,
    reviewCount: 2109,
    inStock: false,
  },
  {
    id: '5',
    name: 'Classic Fit Oxford Shirt',
    description:
      'Timeless button-down Oxford shirt crafted from 100% premium cotton. A wardrobe essential available in multiple colors, perfect for any occasion.',
    price: 59.99,
    category: 'Clothing',
    imageUrl: 'https://picsum.photos/seed/prod5/600/400',
    rating: 4.3,
    reviewCount: 418,
    inStock: true,
  },
  {
    id: '6',
    name: 'Merino Wool Crewneck Sweater',
    description:
      'Ultra-soft merino wool sweater with a classic crewneck silhouette. Temperature-regulating and naturally odor-resistant.',
    price: 129.99,
    category: 'Clothing',
    imageUrl: 'https://picsum.photos/seed/prod6/600/400',
    rating: 4.8,
    reviewCount: 309,
    inStock: true,
  },
  {
    id: '7',
    name: 'Slim Fit Chino Pants',
    description:
      'Versatile slim-fit chinos made from stretch cotton twill. Comfortable for work or weekend wear, with a clean modern look.',
    price: 79.99,
    category: 'Clothing',
    imageUrl: 'https://picsum.photos/seed/prod7/600/400',
    rating: 4.2,
    reviewCount: 654,
    inStock: true,
  },
  {
    id: '8',
    name: 'Running Shoes Pro',
    description:
      'Lightweight, responsive running shoes with advanced cushioning technology and breathable mesh upper. Designed for long-distance performance.',
    price: 139.99,
    category: 'Clothing',
    imageUrl: 'https://picsum.photos/seed/prod8/600/400',
    rating: 4.6,
    reviewCount: 1876,
    inStock: true,
  },
  {
    id: '9',
    name: 'Ceramic Pour-Over Coffee Set',
    description:
      'Elegant ceramic pour-over coffee maker with matching mug and a gooseneck kettle stand. Brew the perfect cup every morning.',
    price: 49.99,
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/prod9/600/400',
    rating: 4.9,
    reviewCount: 743,
    inStock: true,
  },
  {
    id: '10',
    name: 'Linen Duvet Cover Set',
    description:
      'Premium stonewashed linen duvet cover and pillowcase set. Naturally breathable and hypoallergenic for a luxurious sleep experience.',
    price: 189.99,
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/prod10/600/400',
    rating: 4.7,
    reviewCount: 521,
    inStock: true,
  },
  {
    id: '11',
    name: 'Walnut Cutting Board Set',
    description:
      'Hand-crafted walnut cutting board set in three sizes. Food-safe finish, juice grooves, and beautiful grain patterns make these a kitchen centerpiece.',
    price: 79.99,
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/prod11/600/400',
    rating: 4.8,
    reviewCount: 389,
    inStock: true,
  },
  {
    id: '12',
    name: 'Scented Soy Candle Collection',
    description:
      'Set of 4 hand-poured soy wax candles in seasonal scents: Cedarwood, Vanilla Bean, Sea Salt, and Eucalyptus. 45-hour burn time each.',
    price: 44.99,
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/prod12/600/400',
    rating: 4.5,
    reviewCount: 1102,
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}
