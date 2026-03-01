export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-500">
          <p className="font-semibold text-gray-700">Paze Shop</p>
          <p>Example merchant site — for demonstration purposes only.</p>
          <p>© {new Date().getFullYear()} Paze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
