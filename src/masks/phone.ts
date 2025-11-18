import { maskString } from "./common";

export function maskPhoneNumber(phone: string, maskChar: string = '*', showLast: number = 4): string {
  if (typeof phone !== 'string') {
    return phone;
  }

  // String non-digit characters to handle various formats consistently
  const digits = phone.replace(/\D/g, '');

  if (digits.length <= showLast) {
    return phone;
  }

  // Determine the number of characters to mask
  const maskLength = digits.length - showLast;

  // Get the visible part of the digits
  const visiblePart = digits.slice(-showLast);

  // Re-apply the masking to the original formatted string for a more natural look
  // This is a simpler approach than complex regex substitution on the original string:
  let result = phone;
  let digitIndex = 0;
  let maskedString = '';

  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    // Check if the character is a digit
    if (/\d/.test(char)) {
      if (digitIndex < maskLength) {
        maskedString += maskChar; // Apply mask
      } else {
        maskedString += char; // Show the last 4 digits
      }
      digitIndex++;
    } else {
      maskedString += char; // Keep non-digit characters as-is
    }
  }

  return maskedString;
}