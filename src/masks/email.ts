import { maskString } from './common';

export function maskEmail(email: string, maskChar: string = '*'): string {
  if (typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length <= 1) {
    return email; // Return original email if local part is too short
  }

  // Find the first occurrence of '.' in the local part
  const firstDotIndex = localPart.indexOf('.');

  let maskedLocalPart = '';

  if (firstDotIndex > 0) {
    // If there's a dot, show: first char, char after first dot, and last char
    // Skip the first dot but add an extra mask after the char that follows it
    for (let i = 0; i < localPart.length; i++) {
      if (i === firstDotIndex) {
        // Skip the first dot entirely
        continue;
      }
      
      if (i === 0) {
        maskedLocalPart += localPart.charAt(i); // Show the first character
      } else if (i === firstDotIndex + 1) {
        maskedLocalPart += localPart.charAt(i); // Show the character after the first dot
        maskedLocalPart += maskChar; // Add extra mask to compensate for skipped dot
      } else if (i === localPart.length - 1) {
        maskedLocalPart += localPart.charAt(i); // Show the last character
      } else {
        maskedLocalPart += maskChar; // Mask everything else
      }
    }
  } else {
    // if no dot, show first character and mask the rest
    maskedLocalPart = localPart.charAt(0) + maskChar.repeat(localPart.length - 1);
  }

  return `${maskedLocalPart}@${domain}`;
}