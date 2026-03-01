import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-sm text-yellow-500">
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
      <span className="ml-1 text-gray-500">{rating.toFixed(1)}</span>
    </span>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} />
        <p className="text-xs text-gray-400">{product.reviewCount.toLocaleString()} reviews</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.inStock ? (
            <Button size="sm" onClick={() => addItem(product)}>
              Add to Cart
            </Button>
          ) : (
            <span className="text-sm text-red-500 font-medium">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
