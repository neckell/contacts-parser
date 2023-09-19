import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { _parsePhone } from "../main/parsePhone.mjs";

const ProcessPhoneTest = suite('parsePhone');
const countryCodeARG = '54'

ProcessPhoneTest('returns the phone number as is if it is null or empty', () => {
  assert.is(_parsePhone(null, countryCodeARG), null);
  assert.is(_parsePhone('', countryCodeARG), '');
});

ProcessPhoneTest('test phone numbers: + countryCode 9', () => {
  assert.is(_parsePhone('+5493434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('+5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: + countryCode, without 9', () => {
  assert.is(_parsePhone('+543434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('+543415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest('test phone numbers: (without +) countryCode 9', () => {
  assert.is(_parsePhone('5493434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor 9', () => {
  assert.is(_parsePhone('543434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('543415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers starting with 0', () => {
  assert.is(_parsePhone('03434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('03415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor countryCode not 9', () => {
  assert.is(_parsePhone('3434607691', countryCodeARG), '+5493434607691');
  assert.is(_parsePhone('3415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest.run();