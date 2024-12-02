export type ProductType = 'Fresh' | 'Frozen';

export type ProductCategory = {
  id: string;
  name: string;
  type: ProductType;
};

export type BoxSize = {
  id: string;
  name: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  basePrice: number;
  maxWeight: number;
  image: string;
};

export type WeightRange = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

export interface ShippingDetails {
  originZip: string;
  destinationZip: string;
  productType: ProductType;
  category: string;
  weight: number;
  boxSize: string;
  season: string;
}