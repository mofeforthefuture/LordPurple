import { Link } from 'react-router';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/suits';

export function CartPage() {
  const { lines, subtotal, setQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center text-white">
        <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">Cart</p>
        <h1 className="text-3xl md:text-4xl mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-10">Browse the shop and add bespoke pieces to continue.</p>
        <Link
          to="/gallery"
          className="inline-flex px-10 py-4 bg-[#7B3F8F] hover:bg-[#5B2C6F] transition-colors"
        >
          Shop suits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 text-white">
      <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Cart</p>
      <h1 className="text-3xl md:text-4xl mb-10">Your selection</h1>

      <ul className="space-y-6 mb-12">
        {lines.map((line) => (
          <li
            key={line.suitId}
            className="flex gap-4 md:gap-6 p-4 border border-white/10 bg-[#0d0d0d]"
          >
            <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 overflow-hidden">
              <ImageWithFallback
                src={line.image}
                alt={line.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <h2 className="font-medium text-lg truncate">{line.name}</h2>
              <p className="text-[#D4AF37] mt-1">{formatPrice(line.price)} each</p>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center border border-white/20">
                  <button
                    type="button"
                    className="p-2 hover:bg-white/10 disabled:opacity-40"
                    onClick={() => setQuantity(line.suitId, line.quantity - 1)}
                    disabled={line.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm tabular-nums">{line.quantity}</span>
                  <button
                    type="button"
                    className="p-2 hover:bg-white/10 disabled:opacity-40"
                    onClick={() => setQuantity(line.suitId, line.quantity + 1)}
                    disabled={line.quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeLine(line.suitId)}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg text-white tabular-nums">
                {formatPrice(line.price * line.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider">Subtotal</p>
          <p className="text-2xl text-[#D4AF37]">{formatPrice(subtotal)}</p>
          <p className="text-xs text-gray-500 mt-2">Final tailoring price confirmed after fitting.</p>
        </div>
        <Link
          to="/checkout"
          className="inline-flex justify-center px-10 py-4 bg-[#7B3F8F] hover:bg-[#5B2C6F] transition-colors"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
