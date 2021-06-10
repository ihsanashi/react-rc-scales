// Round value to given decimal point
// Default decimal point: 0
const toFixed = (value, decPoint = 0) => value.toFixed(decPoint);

// Parse all weight as float for calculation
const parseFloatWeight = (weightDataObj) => {
  const parsedWeightObj = Object.fromEntries(Object.entries(weightDataObj).map(([key, value]) => [key, parseFloat(value)]));
  return parsedWeightObj;
}

// Calculate total weight
const calculateTotalWeight = (weightDataObj) => {
  const totalWeight = Object.values(weightDataObj).reduce((a, b) => a + b);
  return totalWeight;
}

// Calculate balance values
const calculateBalance = (firstLoad, secondLoad) => {
  return firstLoad + secondLoad;
}

// Calculate balance percentages
const calculateBalancePCT = (firstLoad, secondLoad) => {
  return (firstLoad / (firstLoad + secondLoad)) * 100;
}

// Calculate total axle loads
export const calculateAxleLoad = (data) => {
  // Parse weight values into float for calculation
  const weight = parseFloatWeight(data);

  // Total weight
  const totalWeight = calculateTotalWeight(weight);

  // Front and Rear balance
  // Total weight left and right in front and rear, respectively
  const frontBalance = calculateBalance(weight.frontLeft, weight.frontRight);
  const rearBalance = calculateBalance(weight.rearLeft,  weight.rearRight);
  const frontBalancePCT = calculateBalancePCT(frontBalance, rearBalance);
  const rearBalancePCT = 100 - frontBalancePCT;

  // Left and Right balance
  // Total weight left-side and right-side (sum front and rear on each side)
  const leftBalance = calculateBalance(weight.frontLeft, weight.rearLeft);
  const rightBalance = calculateBalance(weight.frontRight, weight.rearRight);
  const leftBalancePCT = calculateBalancePCT(leftBalance, rightBalance);
  const rightBalancePCT = 100 - leftBalancePCT;

  // Diagonal split
  // Calculate opposite ends of the axles
  const flrrBalance = calculateBalance(weight.frontLeft, weight.rearRight);
  const frrlBalance = calculateBalance(weight.frontRight, weight.rearLeft);
  const flrrBalancePCT = calculateBalancePCT(flrrBalance, frrlBalance);
  const frrlBalancePCT = 100 - flrrBalancePCT;

  return {
    totalWeight: toFixed(totalWeight, 1),
    frontBalance: toFixed(frontBalance, 1),
    rearBalance: toFixed(rearBalance, 1),
    frontBalancePCT : toFixed(frontBalancePCT),
    rearBalancePCT: toFixed(rearBalancePCT),
    leftBalance: toFixed(leftBalance, 1),
    rightBalance: toFixed(rightBalance, 1),
    leftBalancePCT: toFixed(leftBalancePCT),
    rightBalancePCT: toFixed(rightBalancePCT),
    flrrBalance: toFixed(flrrBalance, 1),
    frrlBalance: toFixed(frrlBalance, 1),
    flrrBalancePCT: toFixed(flrrBalancePCT),
    frrlBalancePCT: toFixed(frrlBalancePCT)
  };
};


