import React, { useState, useEffect } from 'react';
import { Calculator, Truck } from 'lucide-react';
import { ProductType, ShippingDetails } from '../types/shipping';
import { calculateShippingCosts } from '../services/shippingCalculator';
import ProductSelector from './ProductSelector';
import WeightSelector from './WeightSelector';
import BoxSelector from './BoxSelector';
import { SEASONS } from '../data/constants';

const ShippingCalculator: React.FC = () => {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    originZip: '',
    destinationZip: '',
    productType: 'Fresh',
    category: '',
    weight: 0,
    boxSize: '',
    season: SEASONS[0].id,
  });

  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculateShippingCosts>>(null);

  const handleZipChange = (field: 'originZip' | 'destinationZip', value: string) => {
    const zipRegex = /^\d{0,5}$/;
    if (zipRegex.test(value)) {
      setShippingDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const updateField = <K extends keyof ShippingDetails>(
    field: K,
    value: ShippingDetails[K]
  ) => {
    setShippingDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-8">
          <Truck className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Advanced Shipping Calculator
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Product Details */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Product Information
              </h2>
              <ProductSelector
                productType={shippingDetails.productType}
                category={shippingDetails.category}
                onTypeChange={(type) => updateField('productType', type)}
                onCategoryChange={(category) => updateField('category', category)}
              />
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Weight Selection
              </h2>
              <WeightSelector
                weight={shippingDetails.weight}
                onChange={(weight) => updateField('weight', weight)}
              />
            </section>
          </div>

          {/* Right Column - Shipping Details */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Shipping Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin ZIP Code
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.originZip}
                    onChange={(e) => handleZipChange('originZip', e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter ZIP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination ZIP Code
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.destinationZip}
                    onChange={(e) => handleZipChange('destinationZip', e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter ZIP"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Shipping Season
              </h2>
              <select
                value={shippingDetails.season}
                onChange={(e) => updateField('season', e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {SEASONS.map((season) => (
                  <option key={season.id} value={season.id}>
                    {season.label}
                  </option>
                ))}
              </select>
            </section>
          </div>
        </div>

        {/* Box Selection */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Select Packaging
          </h2>
          <BoxSelector
            selectedBoxId={shippingDetails.boxSize}
            onSelect={(boxId) => updateField('boxSize', boxId)}
          />
          
          {calculationResult && (
            <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Box:</span>
                  <span className="font-medium">${calculationResult.boxCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Liner:</span>
                  <span className="font-medium">${calculationResult.linerCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dry Ice:</span>
                  <span className="font-medium">${calculationResult.dryIceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CSF Box:</span>
                  <span className="font-medium">${calculationResult.csfBoxCost.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Cost:</span>
                  <span className="text-blue-600">${calculationResult.totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-end">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              const result = calculateShippingCosts(shippingDetails);
              setCalculationResult(result);
            }}
          >
            Calculate Shipping
          </button>
        </div>
        
        {calculationResult === null && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Please fill in all required fields to calculate shipping costs
          </p>
        )}

      </div>
    </div>
  );
};

export default ShippingCalculator;