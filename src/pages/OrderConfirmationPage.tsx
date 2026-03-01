import { useLocation, useParams, Link } from 'react-router-dom';
import type { Order } from '../types';
import { Button } from '../components/ui/Button';

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      {/* Success icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
      <p className="mt-2 text-gray-500">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Order ID</dt>
            <dd className="font-mono font-semibold text-gray-900">{orderId}</dd>
          </div>
          {order?.paymentResult.transactionId && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Transaction ID</dt>
              <dd className="font-mono text-gray-700 text-xs break-all">
                {order.paymentResult.transactionId}
              </dd>
            </div>
          )}
          {order && (
            <>
              <div className="flex justify-between">
                <dt className="text-gray-500">Items</dt>
                <dd className="font-medium">
                  {order.items.reduce((s, i) => s + i.quantity, 0)} item(s)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Shipping to</dt>
                <dd className="text-right text-gray-700">
                  {order.shipping.firstName} {order.shipping.lastName}
                  <br />
                  {order.shipping.address}, {order.shipping.city}, {order.shipping.state}{' '}
                  {order.shipping.zip}
                </dd>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-base">
                <dt>Total Charged</dt>
                <dd>${order.total.toFixed(2)}</dd>
              </div>
            </>
          )}
        </dl>
      </div>

      {order && (
        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">Items Ordered</h2>
          <ul className="space-y-2 text-sm">
            {order.items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between">
                <span className="text-gray-700">
                  {product.name} <span className="text-gray-400">×{quantity}</span>
                </span>
                <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-400">
        A confirmation email would be sent to{' '}
        <span className="font-medium text-gray-600">{order?.shipping.email}</span>.
      </p>

      <Link to="/" className="mt-8 inline-block">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </main>
  );
}
