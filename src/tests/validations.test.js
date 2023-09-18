import { suite } from 'uvu';
import assert from 'uvu/assert';
import { isNullOrEmpty } from '../main/validations';

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
});

IsNullOrEmptyTest('returns true for empty objects', () => {
  assert.is(isNullOrEmpty({}), true);
});

IsNullOrEmptyTest.run();
