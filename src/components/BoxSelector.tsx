import React from 'react';
import { BOX_SIZES } from '../data/constants';
import { Package } from 'lucide-react';

interface BoxSelectorProps {
  selectedBoxId: string;
  onSelect: (boxId: string) => void;
}

const BoxSelector: React.FC<BoxSelectorProps> = ({ selectedBoxId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {BOX_SIZES.map((box) => (
        <div
          key={box.id}
          onClick={() => onSelect(box.id)}
          className={`cursor-pointer rounded-lg border p-4 ${
            selectedBoxId === box.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="aspect-square mb-4 relative rounded-lg overflow-hidden bg-gray-100">
            {box.image ? (
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          <h3 className="font-medium text-gray-900">{box.name}</h3>
          
          <div className="mt-1 text-sm text-gray-500">
            {box.dimensions.length}" × {box.dimensions.width}" × {box.dimensions.height}"
          </div>
          
          <div className="mt-2 text-sm">
            <span className="font-medium text-gray-900">
              ${box.basePrice.toFixed(2)}
            </span>
            <span className="text-gray-500"> /unit</span>
          </div>
          
          <div className="mt-1 text-xs text-gray-500">
            Max weight: {box.maxWeight} lbs
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoxSelector;