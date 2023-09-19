import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { parseContactsCSV } from '../main/parser.js';

test('parseContactsCSV', async () => {
  const buffer = Buffer.from(`Mobile Phone,Home Phone,E-mail Address,E-mail 2 Address,E-mail 3 Address,First Name,Last Name
1234567890,,john.doe@example.com,,,"John","Doe"
123456,,jane.doe@example.com,,,"Jane","Doe"
234567890,,,,,"Janelet","Doe"
`);

  const outputBuffer = await parseContactsCSV(buffer, '54');
  const outputString = outputBuffer.toString();
  console.log(outputString)
  assert.ok(outputString.includes('john.doe@example.com'));
  assert.ok(outputString.includes('123456'));
  assert.ok(outputString.includes('+549234567890'));
  assert.ok(outputString.includes('janelet.doe@yopmail.com'));

});

test.run();