import { isNullOrEmpty } from "./validations.mjs";

export const _parsePhone = (phone, countryCode) => {
  if (isNullOrEmpty(phone)) return phone;
  phone = phone.replace(/[\s-]+/g, "");
  const prefix = `+${countryCode}9`
  let shift = 0;
  if (phone.startsWith(prefix)) shift = prefix.length;
  else if (phone.startsWith(`+${countryCode}`)) shift = countryCode.length + 1;
  else if (phone.startsWith(`${countryCode}9`)) shift = countryCode.length + 1;
  else if (phone.startsWith(`${countryCode}`)) shift = countryCode.length;
  else if (phone.startsWith('0')) shift = 1;
  return prefix + phone.substring(shift);
};
