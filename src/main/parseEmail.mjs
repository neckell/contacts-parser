import { isNullOrEmpty } from "./validations.mjs";

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const hasEmailFormat = (email) => emailFormat.test(email)

export const _parseEmail = (email, firstName, lastName = '', inboxDesired = '@yopmail.com') => {
  let newEmail = '';
  if (!isNullOrEmpty(email) && hasEmailFormat(email)) {
    newEmail = email;
  } else {
    const firstNameForEmail = isNullOrEmpty(firstName) ? '' : firstName.replace(/[^a-zA-Z0-9 ]/g, '');
    const lastNameForEmail = isNullOrEmpty(lastName) ? '' : lastName.replace(/[^a-zA-Z0-9 ]/g, '');
    newEmail = `${firstNameForEmail}${firstName && lastName ? '.' : ''}${lastNameForEmail}${inboxDesired}`;
    newEmail = newEmail.replace(/ /g, '.')
  }
  return newEmail.toLocaleLowerCase();
}