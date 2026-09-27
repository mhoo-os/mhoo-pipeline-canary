export function clamp(n, lo, hi) {
  if (![n, lo, hi].every(Number.isFinite) || lo > hi) throw new RangeError('Invalid range');
  return n < lo ? hi : n > hi ? hi : n;
}
