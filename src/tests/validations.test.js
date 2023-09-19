import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { isNullOrEmpty } from '../main/validations.mjs';

const IsNullOrEmptyTest = suite('isNullOrEmpty');

IsNullOrEmptyTest('returns true for null values', () => {
  assert.is(isNullOrEmpty(null), true);
});

IsNullOrEmptyTest('returns true for empty strings', () => {
  assert.is(isNullOrEmpty(''), true);
});

IsNullOrEmptyTest('returns true for undefined values', () => {
  assert.is(isNullOrEmpty(undefined), true);
  assert.is(isNullOrEmpty('undefined'), true);
});

IsNullOrEmptyTest('returns true for empty arrays', () => {
  assert.is(isNullOrEmpty([]), true);
  assert.is(isNullOrEmpty([0]), false);
});

IsNullOrEmptyTest('returns true for empty objects', () => {
  assert.is(isNullOrEmpty({}), true);
  assert.is(isNullOrEmpty(new Object()), true);
});

IsNullOrEmptyTest.run();
