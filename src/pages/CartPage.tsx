import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/Button';

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  const shippingCost = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <svg
          className="mx-auto h-16 w-16 text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products to get started.</p>
        <Link to="/">
          <Button size="lg" className="mt-6">
            Continue Shopping
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items list */}
        <section className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Link to={`/products/${product.id}`} className="shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-400">{product.category}</p>
                <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                <div className="mt-auto flex items-center justify-between">
                  {/* Quantity control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Order summary */}
        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-fit sticky top-24">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Shipping</dt>
              <dd className={shippingCost === 0 ? 'font-medium text-green-600' : 'font-medium'}>
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Tax (8%)</dt>
              <dd className="font-medium">${tax.toFixed(2)}</dd>
            </div>
            <div className="my-2 border-t border-gray-200" />
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          {subtotal < SHIPPING_THRESHOLD && (
            <p className="mt-4 rounded-md bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
              Add ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <Link to="/checkout" className="mt-6 block">
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/" className="mt-3 block text-center text-sm text-indigo-600 hover:text-indigo-800">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
