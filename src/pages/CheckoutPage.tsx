import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button';
import { createPaymentService } from '../services/payment/paymentService';
import type { ShippingAddress, PaymentPayload, Order } from '../types';

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;

const paymentService = createPaymentService();

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const EMPTY_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
};

function isFormValid(f: FormState): boolean {
  return Object.values(f).every((v) => v.trim() !== '');
}

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid(form)) return;

    setProcessing(true);
    setError(null);

    const orderId = `ORD-${Date.now()}`;
    const shipping: ShippingAddress = { ...form };

    const payload: PaymentPayload = {
      orderId,
      amount: total,
      currency: 'USD',
      items,
      shipping,
    };

    try {
      const result = await paymentService.processPayment(payload);

      const order: Order = {
        id: orderId,
        items,
        shipping,
        subtotal,
        shippingCost,
        tax,
        total,
        paymentResult: result,
        createdAt: new Date().toISOString(),
      };

      clearCart();
      navigate(`/order/${orderId}`, { state: { order } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setProcessing(false);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';
  const labelClass = 'mb-1 block text-sm font-medium text-gray-700';

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name</label>
                <input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} className={inputClass} placeholder="Jane" />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name</label>
                <input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} className={inputClass} placeholder="Doe" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="jane@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>Street Address</label>
                <input id="address" name="address" required value={form.address} onChange={handleChange} className={inputClass} placeholder="123 Main St" />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input id="city" name="city" required value={form.city} onChange={handleChange} className={inputClass} placeholder="San Francisco" />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State</label>
                <input id="state" name="state" required value={form.state} onChange={handleChange} className={inputClass} placeholder="CA" />
              </div>
              <div>
                <label htmlFor="zip" className={labelClass}>ZIP Code</label>
                <input id="zip" name="zip" required value={form.zip} onChange={handleChange} className={inputClass} placeholder="94102" />
              </div>
              <div>
                <label htmlFor="country" className={labelClass}>Country</label>
                <select id="country" name="country" value={form.country} onChange={handleChange} className={inputClass}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment section */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">Payment</h2>
            <p className="mb-4 text-sm text-gray-500">
              This is a demo store. No real payment is processed.
            </p>
            <div className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
              Mock payment — click "Place Order" to simulate a successful transaction.
            </div>
          </section>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <Button type="submit" size="lg" loading={processing} className="w-full">
            {processing ? 'Processing Payment…' : `Place Order — $${total.toFixed(2)}`}
          </Button>
        </form>

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
          <dl className="space-y-2 text-sm border-t border-gray-200 pt-3">
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Shipping</dt>
              <dd className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Tax (8%)</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-base">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
