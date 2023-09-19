import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { parseOutlookRow } from '../main/parseOutlookRow.mjs';

const countryCodeARG = '54'

test('parseOutlookRow - phone larger than 7', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '3435129982',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': '',
    'First Name': 'John',
    'Last Name': 'Doe'
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);

  assert.is(output !== null, true);
  assert.is(output['Mobile Phone'], '+5493435129982');
  assert.is(output['E-mail Address'], 'john.doe@yopmail.com');
});

test('parseOutlookRow - phone shorter than 7', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '111',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': '',
    'First Name': 'John',
    'Last Name': 'Doe'
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);

  assert.is(output !== null, true);
  assert.is(output['Mobile Phone'], '111');
  assert.is(output['E-mail Address'], '');
});

test('parseOutlookRow - email in different position', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '543435129982',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': 'john.doe2@example.com',
    'First Name': 'John',
    'Last Name': 'Doe'
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);
  assert.is(output !== null, true);
  assert.is(output['Mobile Phone'], '+5493435129982');
  assert.is(output['E-mail Address'], 'john.doe2@example.com');
});

test('parseOutlookRow - Mobile Phone different', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '+543435129982',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': 'john.doe2@example.com',
    'First Name': 'John',
    'Last Name': 'Doe'
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);
  assert.is(output !== null, true);
  assert.is(output['Mobile Phone'], '+5493435129982');
  assert.is(output['E-mail Address'], 'john.doe2@example.com');
});

test('parseOutlookRow - first name null', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': '',
    'First Name': null,
    'Last Name': ''
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);

  assert.is(output !== null, false);
});

test('parseOutlookRow - both names empty', () => {
  const emails = new Set();
  const row = {
    'Mobile Phone': '',
    'Home Phone': '',
    'E-mail Address': '',
    'E-mail 2 Address': '',
    'E-mail 3 Address': '',
    'First Name': '',
    'Last Name': ''
  };

  const output = parseOutlookRow(row, emails, countryCodeARG);

  assert.is(output !== null, false);
});

test.run();
