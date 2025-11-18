import { maskString } from './common';

export function maskEmail(email: string, maskChar: string = '*'): string {
  if (typeof email !== 'string' || !email.includes('@')) {
    return email;
  }

  const [localPart, domain] = email.split('@');

  if (localPart.length <= 1) {
    return `${maskChar}@${domain}`;
  }

  // Find the first occurrence of '.' in the local part
  const firstDotIndex = localPart.indexOf('.');

  let maskedLocalPart = localPart.charAt(0); // Always show the first character

  if (firstDotIndex > 0) {
    // If there's a dot, mask everything up to the dot, then show the char after it, and mask the rest
    for (let i = 1; i < localPart.length; i++) {
      if (i === firstDotIndex + 1) {
        maskedLocalPart += localPart.charAt(i); // Show the character after the dot
      } else if (i < firstDotIndex || i > firstDotIndex) {
        maskedLocalPart += maskChar;
      }
    }
  } else {
    // if no dot, just mask everything after the first character
    maskedLocalPart += maskChar.repeat(localPart.length - 1);
  }

  return `${maskedLocalPart}@${domain}`;
}