export function round(num: number, digits: number): number {
  return parseFloat(num.toFixed(digits));
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(min, n), max);
}
