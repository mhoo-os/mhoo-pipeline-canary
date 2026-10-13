export function clamp(n, lo, hi) {
  if (![n, lo, hi].every(Number.isFinite) || lo > hi) throw new RangeError('Invalid range');
  if (n > hi) return hi;
  return n;
}
