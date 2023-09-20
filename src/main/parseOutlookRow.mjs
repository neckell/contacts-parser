import { _parseEmail } from "./parseEmail.mjs";
import { _parsePhone } from "./parsePhone.mjs";
import { isNullOrEmpty } from './validations.mjs';

const hasName = (first, last) =>
  !(isNullOrEmpty(first) && isNullOrEmpty(last))

export const parseOutlookRow = (row, emails, countryCode) => {
  const { 'Mobile Phone': mobilePhone, 'Home Phone': homePhone, 'E-mail Address': email1, 'E-mail 2 Address': email2, 'E-mail 3 Address': email3, 'First Name': firstName, 'Last Name': lastName } = row;
  let phone = mobilePhone || homePhone || undefined;
  let email = email1 || email2 || email3 || undefined;
  if (hasName(firstName, lastName) && !isNullOrEmpty(phone)) {

    row['Home Phone'] = ''
    let newPhone;
    if (phone.length > 7) {
      newPhone = _parsePhone(phone, countryCode);
      row['Mobile Phone'] = newPhone;
    } else {
      row['Mobile Phone'] = phone;
      return row;
    }

    row['E-mail 2 Address'] = '';
    row['E-mail 3 Address'] = '';
    let newEmail = _parseEmail(email, firstName, lastName);

    if (!emails.has(newEmail)) {
      emails.add(newEmail);
    }
    else {
      newEmail = newEmail.replace(/[@]/g, '.' + newPhone + '@');
    }
    row['E-mail Address'] = newEmail;

    return row;
  }
  return null;
}