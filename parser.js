import csv from 'csv-parser';
import fs from 'fs';
import { createObjectCsvWriter as csvWriter } from 'csv-writer';
import stripBomStream from 'strip-bom-stream';
import { isNullOrEmpty } from './validations.js';

const results = [];
const emails = new Set();

const processPhone = (phone) => {
  if (isNullOrEmpty(phone)) return phone;
  if (phone.startsWith('+549')) return phone;
  if (phone.startsWith('+54')) return '+549' + phone.substring(3);
  if (phone.startsWith('54')) return '+549' + phone.substring(2);
  if (phone.startsWith('0')) return '+549' + phone.substring(1);
  return '+549' + phone;
};

fs.createReadStream('contacts.csv')
  .pipe(stripBomStream())
  .pipe(csv())
  .on('data', (data) => {
    const { 'Mobile Phone': mobile, 'Home Phone': home, 'E-mail Address': email, 'E-mail 2 Address': email2, 'E-mail 3 Address': email3, 'First Name': first, 'Last Name': last } = data;
    if (!(isNullOrEmpty(first) && isNullOrEmpty(last))) {
      if (!isNullOrEmpty(mobile) || !isNullOrEmpty(home)) {
        let newEmail = '';
        if (!isNullOrEmpty(email3)) {
          newEmail = email3;
          data['E-mail Address'] = newEmail;
          data['E-mail 3 Address'] = '';
        } else if (isNullOrEmpty(email) && isNullOrEmpty(email2)) {
          const firstName = isNullOrEmpty(first) ? '' : first.replace(/[^a-zA-Z0-9]/g, '');
          const lastName = isNullOrEmpty(last) ? '' : last.replace(/[^a-zA-Z0-9]/g, '');
          newEmail = `${firstName}${firstName && lastName ? '.' : ''}${lastName}@yopmail.com`;
          data['E-mail Address'] = newEmail;
        } else {
          newEmail = email;
        }

        if (!emails.has(newEmail)) {
          emails.add(newEmail);
          data['Mobile Phone'] = processPhone(mobile);
          data['Home Phone'] = processPhone(home);
          results.push(data);
        }
      }
    }
  })
  .on('end', () => {
    const writer = csvWriter({
      path: 'contacts-edited.csv',
      header: Object.keys(results[0]).map((id) => ({ id, title: id })),
    });
    writer.writeRecords(results);
  });
