import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Suit } from '../data/suits';
import type { CartLine } from '../types/commerce';

const CART_KEY = 'lordpurple_cart_v1';

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (suit: Suit) => void;
  removeLine: (suitId: string) => void;
  setQuantity: (suitId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((suit: Suit) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.suitId === suit.id);
      if (existing) {
        return prev.map((l) =>
          l.suitId === suit.id ? { ...l, quantity: Math.min(10, l.quantity + 1) } : l,
        );
      }
      return [
        ...prev,
        {
          suitId: suit.id,
          quantity: 1,
          name: suit.name,
          price: suit.price,
          image: suit.image,
        },
      ];
    });
  }, []);

  const removeLine = useCallback((suitId: string) => {
    setLines((prev) => prev.filter((l) => l.suitId !== suitId));
  }, []);

  const setQuantity = useCallback((suitId: string, quantity: number) => {
    const q = Math.max(0, Math.min(10, Math.floor(quantity)));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.suitId !== suitId);
      return prev.map((l) => (l.suitId === suitId ? { ...l, quantity: q } : l));
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      addItem,
      removeLine,
      setQuantity,
      clearCart,
    }),
    [lines, itemCount, subtotal, addItem, removeLine, setQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
