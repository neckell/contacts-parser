import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { processPhone } from "../main/parser.js";

const ProcessPhoneTest = suite('processPhone');
const countryCodeARG = '54'

ProcessPhoneTest('returns the phone number as is if it is null or empty', () => {
  assert.is(processPhone(null, countryCodeARG), null);
  assert.is(processPhone('', countryCodeARG), '');
});

ProcessPhoneTest('test phone numbers: + countryCode 9', () => {
  assert.is(processPhone('+5493434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('+5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: + countryCode, without 9', () => {
  assert.is(processPhone('+543434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('+543415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest('test phone numbers: (without +) countryCode 9', () => {
  assert.is(processPhone('5493434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('5493415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor 9', () => {
  assert.is(processPhone('543434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('543415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers starting with 0', () => {
  assert.is(processPhone('03434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('03415551234', countryCodeARG), '+5493415551234');
});

ProcessPhoneTest('test phone numbers: without + nor countryCode not 9', () => {
  assert.is(processPhone('3434607691', countryCodeARG), '+5493434607691');
  assert.is(processPhone('3415551234', countryCodeARG), '+5493415551234');
});


ProcessPhoneTest.run();