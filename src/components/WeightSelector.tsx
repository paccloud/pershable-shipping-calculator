import React, { useState } from 'react';
import { WeightRange } from '../types/shipping';
import { WEIGHT_RANGES } from '../data/constants';

interface WeightSelectorProps {
  weight: number;
  onChange: (weight: number) => void;
}

const WeightSelector: React.FC<WeightSelectorProps> = ({ weight, onChange }) => {
  const [isCustom, setIsCustom] = useState(false);

  const handleRangeSelect = (range: WeightRange) => {
    setIsCustom(false);
    onChange(range.min);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Weight
      </label>
      
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {WEIGHT_RANGES.map((range) => (
          <button
            key={range.id}
            onClick={() => handleRangeSelect(range)}
            className={`px-4 py-2 rounded-lg border text-sm ${
              !isCustom && weight >= range.min && (!range.max || weight <= range.max)
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="custom-weight"
          checked={isCustom}
          onChange={(e) => setIsCustom(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="custom-weight" className="text-sm text-gray-600">
          Custom Weight
        </label>
      </div>

      {isCustom && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
            min="0"
            step="0.1"
            className="w-32 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">lbs</span>
        </div>
      )}
    </div>
  );
}

export default WeightSelector;