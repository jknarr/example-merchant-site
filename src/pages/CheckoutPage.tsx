import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import type { Order, ShippingAddress } from '../types';

const BACKEND_URL = import.meta.env.VITE_DEMO_BACKEND_URL as string;
const MERCHANT_ID = import.meta.env.VITE_DEMO_MERCHANT_ID as string;

declare global {
  interface Window {
    DemoCheckout?: {
      mount: (
        container: HTMLElement,
        config: {
          merchantId: string;
          backendUrl: string;
          cart: { productId: string; name: string; price: number; quantity: number; imageUrl?: string }[];
          onSuccess: (result: DemoSuccessResult) => void;
          onError: (error: { code: string; message: string }) => void;
          onCancel: () => void;
        }
      ) => () => void;
    };
  }
}

interface DemoSuccessResult {
  orderId: string;
  transactionId: string;
  timestamp: string;
  shipping: {
    firstName: string;
    lastName: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

export function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const unmountRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (items.length === 0 || !containerRef.current) return;
    let mounted = true;
    let sdkScript: HTMLScriptElement | null = null;

    function mountSDK() {
      if (!mounted || !window.DemoCheckout || !containerRef.current) return;
      unmountRef.current?.();
      unmountRef.current = null;

      const cart = items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      }));

      unmountRef.current = window.DemoCheckout.mount(containerRef.current, {
        merchantId: MERCHANT_ID,
        backendUrl: BACKEND_URL,
        cart,
        onSuccess: (result: DemoSuccessResult) => {
          const shipping: ShippingAddress = {
            firstName: result.shipping.firstName,
            lastName: result.shipping.lastName,
            email: result.shipping.email ?? '',
            address: result.shipping.address,
            city: result.shipping.city,
            state: result.shipping.state,
            zip: result.shipping.zip,
            country: result.shipping.country,
          };

          const order: Order = {
            id: result.orderId,
            items,
            shipping,
            subtotal: result.subtotal,
            shippingCost: result.shippingCost,
            tax: result.tax,
            total: result.total,
            paymentResult: {
              success: true,
              orderId: result.orderId,
              transactionId: result.transactionId,
              message: 'Payment successful',
              timestamp: result.timestamp,
            },
            createdAt: result.timestamp,
          };

          clearCart();
          navigate(`/order/${result.orderId}`, { state: { order } });
        },
        onError: (error) => {
          console.error('[DemoCheckout] Error:', error);
        },
        onCancel: () => {
          navigate(-1);
        },
      });
    }

    function onScriptError() {
      if (!mounted) return;
      console.error('[DemoCheckout] Failed to load SDK');
    }

    // If SDK already loaded (hot reload), mount immediately.
    if (window.DemoCheckout) {
      mountSDK();
    } else {
      sdkScript = document.querySelector('script[data-demo-sdk="true"]');
      if (!sdkScript) {
        sdkScript = document.createElement('script');
        sdkScript.src = '/demo-checkout.umd.js';
        sdkScript.dataset.demoSdk = 'true';
        document.head.appendChild(sdkScript);
      }
      sdkScript.addEventListener('load', mountSDK);
      sdkScript.addEventListener('error', onScriptError);
    }

    return () => {
      mounted = false;
      sdkScript?.removeEventListener('load', mountSDK);
      sdkScript?.removeEventListener('error', onScriptError);
      unmountRef.current?.();
      unmountRef.current = null;
    };
  }, [items.length > 0]);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <Link to="/" className="mt-4 inline-block text-indigo-600 underline">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Demo Checkout iframe */}
        <div className="lg:col-span-2">
          <div
            ref={containerRef}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            style={{ minHeight: 400 }}
          />
        </div>

        {/* Order summary */}
        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-fit sticky top-24">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>
          <ul className="mb-4 divide-y divide-gray-100 text-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between py-2">
                <span className="text-gray-700 line-clamp-1 flex-1 pr-2">
                  {product.name} <span className="text-gray-400">×{quantity}</span>
                </span>
                <span className="font-medium shrink-0">${(product.price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 text-center">Totals calculated at checkout</p>
        </aside>
      </div>
    </main>
  );
}
