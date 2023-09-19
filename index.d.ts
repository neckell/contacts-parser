export function parseContacts(file: any, countryCode: string): Promise<Uint8Array>;
export function parseEmail(email: string, firstName: string, lastName: string, inboxDesired: string): Promise<string>;
export function parsePhone(phone: string, countryCode: string): Promise<string>;