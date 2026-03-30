import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';

import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { cn } from '../components/ui/utils';
import {
  CATEGORY_LABELS,
  COLOR_LABELS,
  FIT_LABELS,
  OCCASION_LABELS,
  SUITS,
  formatPrice,
  type Suit,
  type SuitCategory,
  type SuitColor,
  type SuitFit,
  type SuitOccasion,
} from '../data/suits';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as SuitCategory[];
const ALL_FITS = Object.keys(FIT_LABELS) as SuitFit[];
const ALL_OCCASIONS = Object.keys(OCCASION_LABELS) as SuitOccasion[];
const ALL_COLORS = Object.keys(COLOR_LABELS) as SuitColor[];

function isCategory(s: string): s is SuitCategory {
  return ALL_CATEGORIES.includes(s as SuitCategory);
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs md:text-sm tracking-wide border transition-colors',
        active
          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
          : 'border-white/20 text-gray-300 hover:border-white/40 hover:text-white',
      )}
    >
      {label}
    </button>
  );
}

function sortSuits(list: Suit[], sort: SortKey): Suit[] {
  const copy = [...list];
  if (sort === 'featured') {
    return copy.sort((a, b) => {
      const af = a.featured ? 0 : 1;
      const bf = b.featured ? 0 : 1;
      if (af !== bf) return af - bf;
      return a.name.localeCompare(b.name);
    });
  }
  if (sort === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  return copy.sort((a, b) => a.name.localeCompare(b.name));
}

export function GalleryPage() {
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('featured');
  const [categories, setCategories] = useState<Set<SuitCategory>>(new Set());
  const [fits, setFits] = useState<Set<SuitFit>>(new Set());
  const [occasions, setOccasions] = useState<Set<SuitOccasion>>(new Set());
  const [colors, setColors] = useState<Set<SuitColor>>(new Set());

  useEffect(() => {
    const c = searchParams.get('category');
    if (!c || !isCategory(c)) return;
    setCategories(new Set([c]));
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('category');
        return next;
      },
      { replace: true },
    );
  }, [searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUITS.filter((s) => {
      if (q && !s.name.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q)) {
        return false;
      }
      if (categories.size && !categories.has(s.category)) return false;
      if (fits.size && !fits.has(s.fit)) return false;
      if (occasions.size && !occasions.has(s.occasion)) return false;
      if (colors.size && !colors.has(s.color)) return false;
      return true;
    });
  }, [query, categories, fits, occasions, colors]);

  const sorted = useMemo(() => sortSuits(filtered, sort), [filtered, sort]);

  const activeFilterCount =
    categories.size + fits.size + occasions.size + colors.size + (query.trim() ? 1 : 0);

  function clearFilters() {
    setQuery('');
    setCategories(new Set());
    setFits(new Set());
    setOccasions(new Set());
    setColors(new Set());
    setSort('featured');
  }

  return (
    <div className="bg-black text-white pb-24">
      <div className="border-b border-white/10 bg-gradient-to-b from-[#1a0a1f] to-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="text-sm tracking-[0.3em] uppercase text-[#D4AF37] mb-4">The atelier shop</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">Suits &amp; formal wear</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Browse silhouettes like you would in-store—filter by cut, occasion, and palette. Every
            piece is made to measure at our Lagos atelier.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          <aside className="lg:w-72 shrink-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <label htmlFor="gallery-search" className="sr-only">
                Search suits
              </label>
              <Input
                id="gallery-search"
                placeholder="Search by name or detail..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3">Sort</p>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="bg-white/5 border-white/20 text-white w-full">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#333] text-white">
                  <SelectItem value="featured">Featured first</SelectItem>
                  <SelectItem value="price-asc">Price: low to high</SelectItem>
                  <SelectItem value="price-desc">Price: high to low</SelectItem>
                  <SelectItem value="name">Name A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3">Style</p>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map((key) => (
                  <FilterChip
                    key={key}
                    label={CATEGORY_LABELS[key]}
                    active={categories.has(key)}
                    onClick={() => setCategories((s) => toggleInSet(s, key))}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3">Fit</p>
              <div className="flex flex-wrap gap-2">
                {ALL_FITS.map((key) => (
                  <FilterChip
                    key={key}
                    label={FIT_LABELS[key]}
                    active={fits.has(key)}
                    onClick={() => setFits((s) => toggleInSet(s, key))}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {ALL_OCCASIONS.map((key) => (
                  <FilterChip
                    key={key}
                    label={OCCASION_LABELS[key]}
                    active={occasions.has(key)}
                    onClick={() => setOccasions((s) => toggleInSet(s, key))}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#D4AF37] mb-3">Color</p>
              <div className="flex flex-wrap gap-2">
                {ALL_COLORS.map((key) => (
                  <FilterChip
                    key={key}
                    label={COLOR_LABELS[key]}
                    active={colors.has(key)}
                    onClick={() => setColors((s) => toggleInSet(s, key))}
                  />
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-[#9B7CB9] hover:text-[#D4AF37] underline underline-offset-4"
              >
                Clear all filters ({activeFilterCount})
              </button>
            )}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <p className="text-gray-400">
                Showing{' '}
                <span className="text-white font-medium">{sorted.length}</span> of {SUITS.length}{' '}
                looks
              </p>
            </div>

            {sorted.length === 0 ? (
              <div className="border border-white/15 bg-white/[0.03] p-12 text-center">
                <p className="text-xl text-white mb-2">No suits match those filters</p>
                <p className="text-gray-400 mb-6">Try clearing a category or search term.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex px-8 py-3 bg-[#7B3F8F] hover:bg-[#5B2C6F] text-white transition-colors"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {sorted.map((suit) => (
                  <li key={suit.id}>
                    <article className="group flex flex-col h-full border border-white/10 bg-[#0d0d0d] hover:border-[#7B3F8F]/50 transition-colors">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <ImageWithFallback
                          src={suit.image}
                          alt={suit.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {suit.featured && (
                          <span className="absolute top-3 left-3 px-2 py-1 text-[10px] tracking-[0.2em] uppercase bg-[#D4AF37] text-black">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-1">
                          {CATEGORY_LABELS[suit.category]} · {FIT_LABELS[suit.fit]}
                        </p>
                        <h2 className="text-xl text-white mb-2 font-medium">{suit.name}</h2>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                          {suit.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs px-2 py-0.5 border border-white/15 text-gray-400">
                            {OCCASION_LABELS[suit.occasion]}
                          </span>
                          <span className="text-xs px-2 py-0.5 border border-white/15 text-gray-400">
                            {COLOR_LABELS[suit.color]}
                          </span>
                        </div>
                        <p className="text-[#D4AF37] text-lg">{formatPrice(suit.price)}</p>
                        <button
                          type="button"
                          onClick={() => {
                            addItem(suit);
                            toast.success('Added to cart', { description: suit.name });
                          }}
                          className="mt-4 w-full py-3 text-sm tracking-wide uppercase bg-[#7B3F8F] hover:bg-[#5B2C6F] text-white transition-colors"
                        >
                          Add to cart
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                          Made to measure · price varies with fabric
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
