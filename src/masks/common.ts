// Helper function to apply partial masking to a string
export function maskString(
  value: string,
  maskChar: string,
  showLast: number
): string {
  if (typeof value !== 'string' || value.length <= showLast) {
    return value;
  }

  const maskLength = value.length - showLast;
  const maskedPart = maskChar.repeat(maskLength);
  const visiblePart = value.slice(-showLast);

  return maskedPart + visiblePart;
}