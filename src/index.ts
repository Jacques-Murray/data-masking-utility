/**
 * Data Masking Utility
 * 
 * Provides functions to mask sensitive data like email addresses, phone numbers, and credit cards.
 */

/**
 * Masks an email address by replacing characters with asterisks
 * @param email - The email address to mask
 * @returns The masked email address
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) {
    return email;
  }
  
  const maskedUsername = username.length > 2
    ? username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
    : username;
  
  return `${maskedUsername}@${domain}`;
}

/**
 * Masks a phone number by replacing digits with asterisks
 * @param phone - The phone number to mask
 * @returns The masked phone number
 */
export function maskPhone(phone: string): string {
  if (phone.length < 4) {
    return phone;
  }
  
  return '*'.repeat(phone.length - 4) + phone.slice(-4);
}

/**
 * Masks a credit card number by showing only the last 4 digits
 * @param cardNumber - The credit card number to mask
 * @returns The masked credit card number
 */
export function maskCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (cleaned.length < 4) {
    return cardNumber;
  }
  
  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
}
