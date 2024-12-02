import { ShippingDetails } from '../types/shipping';
import { BOX_SIZES, PRODUCT_CATEGORIES } from '../data/constants';

interface ShippingCosts {
  boxCost: number;
  linerCost: number;
  dryIceCost: number;
  csfBoxCost: number;
  totalCost: number;
}

const COSTS = {
  LINER: 3.22,
  DRY_ICE_PER_LB: 0.415,
  CSF_BOX: 0.56,
};

export function calculateShippingCosts(details: ShippingDetails): ShippingCosts | null {
  if (!isValidForCalculation(details)) {
    return null;
  }

  const selectedBox = BOX_SIZES.find(box => box.id === details.boxSize);
  if (!selectedBox) {
    return null;
  }

  // Calculate box cost with volume pricing
  let boxCost = selectedBox.basePrice;
  
  // Calculate dry ice needs based on product type
  const dryIceNeeded = details.productType === 'Frozen' ? Math.ceil(details.weight * 0.75) : 0;
  const dryIceCost = dryIceNeeded * COSTS.DRY_ICE_PER_LB;

  return {
    boxCost,
    linerCost: COSTS.LINER,
    dryIceCost,
    csfBoxCost: COSTS.CSF_BOX,
    totalCost: boxCost + COSTS.LINER + dryIceCost + COSTS.CSF_BOX,
  };
}

function isValidForCalculation(details: ShippingDetails): boolean {
  return (
    details.originZip.length === 5 &&
    details.destinationZip.length === 5 &&
    details.weight > 0 &&
    details.boxSize !== '' &&
    details.category !== ''
  );
}