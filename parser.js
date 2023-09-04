import csv from 'csv-parser';
import fs from 'fs';
import { createObjectCsvWriter as csvWriter } from 'csv-writer';
import stripBomStream from 'strip-bom-stream';
import { isNullOrEmpty } from './validations.js';

const results = [];
const emails = new Set();

const processPhone = (phone) => {
  if (isNullOrEmpty(phone)) return phone;
  if (phone.startsWith('+549')) return '+549' + phone.substring(4);
  if (phone.startsWith('+54')) return '+549' + phone.substring(3);
  if (phone.startsWith('54')) return '+549' + phone.substring(2);
  if (phone.startsWith('0')) return '+549' + phone.substring(1);
  return '+549' + phone;
};

const hasName = (first, last) =>
  !(isNullOrEmpty(first) && isNullOrEmpty(last))

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const hasEmailFormat = (email) => emailFormat.test(email)

fs.createReadStream('contacts.csv')
  .pipe(stripBomStream())
  .pipe(csv())
  .on('data', (data) => {
    const { 'Mobile Phone': mobilePhone, 'Home Phone': homePhone, 'E-mail Address': email1, 'E-mail 2 Address': email2, 'E-mail 3 Address': email3, 'First Name': firstName, 'Last Name': lastName } = data;
    let phone = mobilePhone || homePhone || undefined;
    if (hasName(firstName, lastName) && !isNullOrEmpty(phone)) {
      let email = email1 || email2 || email3 || undefined;

      let newEmail = '';
      if (!isNullOrEmpty(email) && hasEmailFormat(email)) {
        newEmail = email;
      } else {
        const firstNameForEmail = isNullOrEmpty(firstName) ? '' : firstName.replace(/[^a-zA-Z0-9]/g, '');
        const lastNameForEmail = isNullOrEmpty(lastName) ? '' : lastName.replace(/[^a-zA-Z0-9]/g, '');
        newEmail = `${firstNameForEmail}${firstName && lastName ? '.' : ''}${lastNameForEmail}@yopmail.com`;
        newEmail = newEmail.replace(/paciente/g, '.paciente')
        newEmail = newEmail.replace(/Paciente/g, '.paciente')
      }

      data['E-mail Address'] = newEmail;
      data['E-mail 2Address'] = '';
      data['E-mail 3 Address'] = '';

      if (!emails.has(newEmail)) {
        emails.add(newEmail);
        phone = phone.replace(/[\s-]+/g, "")
        if (phone.length > 7) {
          data['Mobile Phone'] = processPhone(phone);
        } else {
          data['Mobile Phone'] = phone;
          data['E-mail Address'] = '';
        }
        data['Home Phone'] = ''
        results.push(data);
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
