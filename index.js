import { _parseEmail } from "./src/main/parseEmail.mjs";
import { _parsePhone } from "./src/main/parsePhone.mjs";
import { _parseContacts } from "./src/main/parseContacts.js";

const parseContacts = (file, countryCode) => _parseContacts(file, countryCode)

const parseEmail = (email, firstName, lastName, inboxDesired) => _parseEmail(email, firstName, lastName, inboxDesired)

const parsePhone = (phone, countryCode) => _parsePhone(phone, countryCode);

export { parseContacts, parseEmail, parsePhone }