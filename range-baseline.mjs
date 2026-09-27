import assert from 'node:assert/strict';
import {clamp} from './range.mjs';
assert.equal(clamp(5, 0, 10), 5);
assert.equal(clamp(11, 0, 10), 10);
assert.equal(clamp(0, 0, 10), 0);
assert.equal(clamp(10, 0, 10), 10);
assert.equal(clamp(2, 2, 2), 2);
for (const args of [[NaN, 0, 10], [0, -Infinity, 10], [0, 0, Infinity], [0, 10, 0]]) {
  assert.throws(() => clamp(...args), RangeError);
}
