"use client";
export const getUnique = (array, key) => {
    const seen = new Set();
    return array.filter((item) => {
      const val = item[key];
      if (seen.has(val)) return false;
  
      seen.add(val);
      return true;
    });
  };

export const calculateDiscountPercentage = (mrp, price) => {
  if (!mrp || mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};