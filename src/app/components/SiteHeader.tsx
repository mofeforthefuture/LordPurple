import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, ShoppingBag } from 'lucide-react';

import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from './ui/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm tracking-[0.2em] uppercase transition-colors',
    isActive ? 'text-[#D4AF37]' : 'text-white/80 hover:text-[#D4AF37]',
  );

const routes = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Shop suits' },
  { to: '/about', label: 'Our story' },
  { to: '/experience', label: 'Why us' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/booking', label: 'Book fitting' },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-[4.5rem] flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0 group">
          <span className="text-[#D4AF37] text-sm md:text-base tracking-[0.35em] uppercase font-medium">
            Lord Purple
          </span>
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-10">
          {routes.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/cart"
            className="relative p-2 text-white border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            aria-label={`Shopping cart${itemCount ? `, ${itemCount} items` : ''}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center rounded-full bg-[#D4AF37] text-black text-[10px] font-semibold tabular-nums">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="p-2 text-white border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a0a] border-[#333] w-[min(100%,320px)]">
              <nav className="flex flex-col gap-1 mt-10">
                {routes.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'py-4 px-2 text-sm tracking-[0.2em] uppercase border-b border-white/10',
                        isActive ? 'text-[#D4AF37]' : 'text-white/90',
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <NavLink
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="py-4 px-2 text-sm tracking-[0.2em] uppercase border-b border-white/10 text-white/90"
                >
                  Cart {itemCount > 0 ? `(${itemCount})` : ''}
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  );
}
