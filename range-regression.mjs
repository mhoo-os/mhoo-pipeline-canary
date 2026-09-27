import assert from 'node:assert/strict';
import {clamp} from './range.mjs';

assert.equal(clamp(-1, 0, 10), 0);
