import assert from 'node:assert/strict';
import value from './value.mjs';

assert.ok(Number.isInteger(value), 'value must be an integer');
console.log('Baseline passed: value is an integer.');
