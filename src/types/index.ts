export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Clothing' | 'Home';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentPayload {
  orderId: string;
  amount: number;
  currency: string;
  items: CartItem[];
  shipping: ShippingAddress;
}

export interface PaymentResult {
  success: boolean;
  orderId: string;
  transactionId: string;
  message: string;
  timestamp: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentResult: PaymentResult;
  createdAt: string;
}
