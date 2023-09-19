import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { parsePhone } from "../main/parsePhone.mjs";

const ProcessPhoneTest = suite('parsePhone');
const countryCodeARG = '54'

ProcessPhoneTest('returns the phone number as is if it is null or empty', () => {
  assert.is(parsePhone(null, countryCodeARG), null);
  assert.is(parsePhone('', countryCodeARG), '');
});

ProcessPhoneTest('test phone numbers: + countryCode 9', () => {
  assert.is(parsePhone('+5493434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('+5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: + countryCode, without 9', () => {
  assert.is(parsePhone('+543434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('+543415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest('test phone numbers: (without +) countryCode 9', () => {
  assert.is(parsePhone('5493434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor 9', () => {
  assert.is(parsePhone('543434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('543415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers starting with 0', () => {
  assert.is(parsePhone('03434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('03415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor countryCode not 9', () => {
  assert.is(parsePhone('3434607691', countryCodeARG), '+5493434607691');
  assert.is(parsePhone('3415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest.run();