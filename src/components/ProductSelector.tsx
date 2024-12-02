import React from 'react';
import { ProductType } from '../types/shipping';
import { PRODUCT_CATEGORIES } from '../data/constants';
import { Snowflake, Leaf } from 'lucide-react';

interface ProductSelectorProps {
  productType: ProductType;
  category: string;
  onTypeChange: (type: ProductType) => void;
  onCategoryChange: (category: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  productType,
  category,
  onTypeChange,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => onTypeChange('Fresh')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            productType === 'Fresh'
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Leaf className="w-5 h-5" />
          Fresh
        </button>
        <button
          onClick={() => onTypeChange('Frozen')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            productType === 'Frozen'
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Snowflake className="w-5 h-5" />
          Frozen
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Category
        </label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {PRODUCT_CATEGORIES.filter((cat) => cat.type === productType).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ProductSelector;