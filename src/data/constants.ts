import { ProductCategory, BoxSize, WeightRange } from '../types/shipping';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'fresh-produce', name: 'Fresh Produce', type: 'Fresh' },
  { id: 'fresh-meat', name: 'Fresh Meat', type: 'Fresh' },
  { id: 'frozen-meat', name: 'Frozen Meat', type: 'Frozen' },
  { id: 'frozen-seafood', name: 'Frozen Seafood', type: 'Frozen' },
];

export const BOX_SIZES: BoxSize[] = [
  {
    id: 'small',
    name: 'Small',
    dimensions: { length: 12, width: 12, height: 12 },
    basePrice: 16,
    maxWeight: 20,
    image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'medium',
    name: 'Medium',
    dimensions: { length: 18, width: 18, height: 18 },
    basePrice: 24,
    maxWeight: 40,
    image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'large',
    name: 'Large',
    dimensions: { length: 24, width: 24, height: 24 },
    basePrice: 32,
    maxWeight: 75,
    image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=800&q=80',
  },
];

export const WEIGHT_RANGES: WeightRange[] = [
  { id: '0-5', label: '0-5 lbs', min: 0, max: 5 },
  { id: '6-10', label: '6-10 lbs', min: 6, max: 10 },
  { id: '11-20', label: '11-20 lbs', min: 11, max: 20 },
  { id: '21+', label: '21+ lbs', min: 21, max: null },
];

export const SEASONS = [
  { id: 'mar-may', label: 'Spring (Mar-May)' },
  { id: 'jun-aug', label: 'Summer (Jun-Aug)' },
  { id: 'sep-nov', label: 'Fall (Sep-Nov)' },
  { id: 'dec-feb', label: 'Winter (Dec-Feb)' },
];