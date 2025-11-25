export const calculateProfit = (revenue, cost) => {
  return revenue - cost;
};

export const calculateProfitMargin = (revenue, cost) => {
  if (!revenue || revenue === 0) return 0;
  return ((revenue - cost) / revenue) * 100;
};

export const calculateROI = (profit, investment) => {
  if (!investment || investment === 0) return 0;
  return (profit / investment) * 100;
};

export const calculateTax = (amount, taxRate = 0.20) => {
  return amount * taxRate;
};

export const calculateTotalWithTax = (amount, taxRate = 0.20) => {
  return amount * (1 + taxRate);
};

export const calculateDiscount = (originalPrice, discountPercent) => {
  return originalPrice * (discountPercent / 100);
};

export const calculateDiscountedPrice = (originalPrice, discountPercent) => {
  return originalPrice - calculateDiscount(originalPrice, discountPercent);
};

export const calculateAverage = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

export const calculatePercentageChange = (oldValue, newValue) => {
  if (!oldValue || oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

export const calculateGrowthRate = (currentValue, previousValue, periods = 1) => {
  if (!previousValue || previousValue === 0) return 0;
  return ((Math.pow(currentValue / previousValue, 1 / periods) - 1) * 100);
};

export const calculateTotal = (items, key = 'amount') => {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => sum + (item[key] || 0), 0);
};

