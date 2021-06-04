export const calculateAxleLoad = (data) => {
  // const { frontLeft, frontRight, rearLeft, rearRight } = data;

  const frontLeft = parseFloat(data.frontLeft);
  const frontRight = parseFloat(data.frontRight);
  const rearLeft = parseFloat(data.rearLeft);
  const rearRight = parseFloat(data.rearRight);


  // Total weight
  const totalWeight = frontLeft + frontRight + rearLeft + rearRight;

  // Front and Rear balance
  // Total weight left and right in front and rear, respectively
  const frontBalance = frontLeft + frontRight;
  const rearBalance = rearLeft + rearRight;
  const frontBalancePCT = (frontBalance / (frontBalance + rearBalance)) * 100;
  const rearBalancePCT = 100 - frontBalancePCT;

  // Left and Right balance
  // Total weight left-side and right-side (sum front and rear on each side)
  const leftBalance = frontLeft + rearLeft;
  const rightBalance = frontRight + rearRight;
  const leftBalancePCT = (leftBalance / (leftBalance + rightBalance)) * 100;
  const rightBalancePCT = 100 - leftBalancePCT;

  // Diagonal split
  // Calculate opposite ends of the axles
  const flrrBalance = frontLeft + rearRight;
  const frrlBalance = frontRight + rearLeft;
  const flrrBalancePCT = (flrrBalance / (flrrBalance + frrlBalance)) * 100;
  const frrlBalancePCT = 100 - flrrBalancePCT;

  const result = {
    totalWeight: toFixed(totalWeight, 1),
    frontBalance: toFixed(frontBalance, 1),
    rearBalance: toFixed(rearBalance, 1),
    frontBalancePCT : toFixed(frontBalancePCT, 0),
    rearBalancePCT: toFixed(rearBalancePCT, 0),
    leftBalance: toFixed(leftBalance, 1),
    rightBalance: toFixed(rightBalance, 1),
    leftBalancePCT: toFixed(leftBalancePCT, 0),
    rightBalancePCT: toFixed(rightBalancePCT, 0),
    flrrBalance: toFixed(flrrBalance, 1),
    frrlBalance: toFixed(frrlBalance, 1),
    flrrBalancePCT: toFixed(flrrBalancePCT, 0),
    frrlBalancePCT: toFixed(frrlBalancePCT, 0)
  };

  return result;
};

const toFixed = (value, decPoint) => value.toFixed(decPoint);