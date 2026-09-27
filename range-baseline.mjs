import assert from 'node:assert/strict';
import {clamp} from './range.mjs';
assert.equal(clamp(5, 0, 10), 5);
assert.equal(clamp(11, 0, 10), 10);
assert.equal(clamp(0, 0, 10), 0);
assert.equal(clamp(10, 0, 10), 10);
assert.equal(clamp(2, 2, 2), 2);
for (const invalid of [NaN, Infinity, -Infinity]) {
  for (let position = 0; position < 3; position++) {
    const args = [5, 0, 10];
    args[position] = invalid;
    assert.throws(() => clamp(...args), RangeError);
  }
}
assert.throws(() => clamp(0, 10, 0), RangeError);
