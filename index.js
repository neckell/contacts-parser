import { parseContactsCSV } from "./src/main/parser.js";

const parseContacts = (file, countryCode) => parseContactsCSV(file, countryCode)

export default parseContacts