import { useState, useMemo } from 'react';
import { products } from '../data/products';
import type { Product } from '../types';
import { ProductCard } from '../components/ui/ProductCard';

const CATEGORIES: Array<Product['category'] | 'All'> = ['All', 'Electronics', 'Clothing', 'Home'];

export function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Product['category'] | 'All'>('All');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Shop Everything
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Quality products across Electronics, Clothing, and Home.
        </p>
      </section>

      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={[
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ].join(' ')}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg">No products match your search.</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="mt-4 text-indigo-600 underline hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
