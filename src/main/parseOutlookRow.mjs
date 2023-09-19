import { parsePhone } from "./parsePhone.mjs";
import { isNullOrEmpty } from './validations.mjs';

const hasName = (first, last) =>
  !(isNullOrEmpty(first) && isNullOrEmpty(last))

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const hasEmailFormat = (email) => emailFormat.test(email)

export const parseOutlookRow = (row, emails, countryCode) => {
  const { 'Mobile Phone': mobilePhone, 'Home Phone': homePhone, 'E-mail Address': email1, 'E-mail 2 Address': email2, 'E-mail 3 Address': email3, 'First Name': firstName, 'Last Name': lastName } = row;
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
      newEmail = newEmail.replace(/ /g, '.')
      newEmail = newEmail.toLocaleLowerCase();
    }

    row['E-mail Address'] = newEmail;
    row['E-mail 2Address'] = '';
    row['E-mail 3 Address'] = '';

    if (!emails.has(newEmail)) {
      emails.add(newEmail);
      phone = phone.replace(/[\s-]+/g, "")
      if (phone.length > 7) {
        row['Mobile Phone'] = parsePhone(phone, countryCode);
      } else {
        row['Mobile Phone'] = phone;
        row['E-mail Address'] = '';
      }
      row['Home Phone'] = ''
      return row;
    }
  }
  return null;
}