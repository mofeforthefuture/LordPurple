export type SuitCategory =
  | 'three-piece'
  | 'two-piece'
  | 'tuxedo'
  | 'blazer'
  | 'traditional';

export type SuitFit = 'slim' | 'classic' | 'relaxed';

export type SuitOccasion =
  | 'business'
  | 'wedding'
  | 'evening'
  | 'ceremony';

export type SuitColor =
  | 'navy'
  | 'black'
  | 'charcoal'
  | 'burgundy'
  | 'cream'
  | 'white';

export interface Suit {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: SuitCategory;
  fit: SuitFit;
  occasion: SuitOccasion;
  color: SuitColor;
  featured?: boolean;
}

export const CATEGORY_LABELS: Record<SuitCategory, string> = {
  'three-piece': 'Three-piece',
  'two-piece': 'Two-piece',
  tuxedo: 'Tuxedo & evening',
  blazer: 'Blazer',
  traditional: 'Traditional / native',
};

export const FIT_LABELS: Record<SuitFit, string> = {
  slim: 'Slim',
  classic: 'Classic',
  relaxed: 'Relaxed',
};

export const OCCASION_LABELS: Record<SuitOccasion, string> = {
  business: 'Business',
  wedding: 'Wedding',
  evening: 'Evening',
  ceremony: 'Ceremony',
};

export const COLOR_LABELS: Record<SuitColor, string> = {
  navy: 'Navy',
  black: 'Black',
  charcoal: 'Charcoal',
  burgundy: 'Burgundy',
  cream: 'Cream',
  white: 'White',
};

export const SUITS: Suit[] = [
  {
    id: 'lp-001',
    name: 'Midnight Sovereign',
    description: 'Peak lapel three-piece in Italian wool with hand-finished lapels.',
    image:
      'https://images.unsplash.com/photo-1770452603217-89b4f03e8271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 485000,
    category: 'three-piece',
    fit: 'classic',
    occasion: 'business',
    color: 'navy',
    featured: true,
  },
  {
    id: 'lp-002',
    name: 'Victoria Charcoal',
    description: 'Two-piece with soft shoulder and subtle pick-stitching.',
    image:
      'https://images.unsplash.com/photo-1515736076039-a3ca66043b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 395000,
    category: 'two-piece',
    fit: 'slim',
    occasion: 'business',
    color: 'charcoal',
    featured: true,
  },
  {
    id: 'lp-003',
    name: 'Noir Gala',
    description: 'Shawl-collar tuxedo in barathea wool with silk grosgrain facings.',
    image:
      'https://images.unsplash.com/photo-1774095906774-3ac476493d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 620000,
    category: 'tuxedo',
    fit: 'classic',
    occasion: 'evening',
    color: 'black',
    featured: true,
  },
  {
    id: 'lp-004',
    name: 'Heritage Agbada Set',
    description: 'Embroidered native formal with bespoke inner kaftan.',
    image:
      'https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 550000,
    category: 'traditional',
    fit: 'relaxed',
    occasion: 'ceremony',
    color: 'white',
    featured: true,
  },
  {
    id: 'lp-005',
    name: 'Lagos Boardroom',
    description: 'Single-breast two-piece with ticket pocket and working cuffs.',
    image:
      'https://images.unsplash.com/photo-1770283555098-e152e212fec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 365000,
    category: 'two-piece',
    fit: 'classic',
    occasion: 'business',
    color: 'navy',
  },
  {
    id: 'lp-006',
    name: 'Royal Plum Blazer',
    description: 'Unstructured blazer in hopsack weave for year-round wear.',
    image:
      'https://images.unsplash.com/photo-1515736076039-a3ca66043b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 285000,
    category: 'blazer',
    fit: 'relaxed',
    occasion: 'evening',
    color: 'burgundy',
  },
  {
    id: 'lp-007',
    name: 'Ivory Union',
    description: 'Three-piece wedding suit with contrast waistcoat option.',
    image:
      'https://images.unsplash.com/photo-1774095906774-3ac476493d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 720000,
    category: 'three-piece',
    fit: 'slim',
    occasion: 'wedding',
    color: 'cream',
  },
  {
    id: 'lp-008',
    name: 'Obsidian Peak',
    description: 'Double-breast tuxedo with satin trim and side adjusters.',
    image:
      'https://images.unsplash.com/photo-1770452603217-89b4f03e8271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 680000,
    category: 'tuxedo',
    fit: 'slim',
    occasion: 'evening',
    color: 'black',
  },
  {
    id: 'lp-009',
    name: 'Copperline Ceremony',
    description: 'Traditional ensemble with handwoven accents and modern cut.',
    image:
      'https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 510000,
    category: 'traditional',
    fit: 'classic',
    occasion: 'ceremony',
    color: 'burgundy',
  },
  {
    id: 'lp-010',
    name: 'Smoke & Slate',
    description: 'Soft shoulder blazer paired with tailored trousers.',
    image:
      'https://images.unsplash.com/photo-1515736076039-a3ca66043b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 310000,
    category: 'blazer',
    fit: 'classic',
    occasion: 'business',
    color: 'charcoal',
  },
  {
    id: 'lp-011',
    name: 'Pearl Evening',
    description: 'White dinner jacket with black trousers — warm-weather formal.',
    image:
      'https://images.unsplash.com/photo-1774095906774-3ac476493d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 540000,
    category: 'tuxedo',
    fit: 'classic',
    occasion: 'wedding',
    color: 'white',
  },
  {
    id: 'lp-012',
    name: 'Founders Three',
    description: 'Herringbone three-piece with patch pockets for smart casual.',
    image:
      'https://images.unsplash.com/photo-1770283555098-e152e212fec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    price: 445000,
    category: 'three-piece',
    fit: 'relaxed',
    occasion: 'business',
    color: 'navy',
  },
];

export function formatPrice(naira: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(naira);
}
