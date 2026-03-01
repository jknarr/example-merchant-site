import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

// --- State & Actions ---

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

// --- Reducer ---

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

// --- Context ---

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

// --- Provider ---

const STORAGE_KEY = 'paze_cart';

function loadFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    // ignore parse errors
  }
  return { items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    totalItems,
    subtotal,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
