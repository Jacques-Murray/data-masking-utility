import * as crypto from 'crypto';

/**
 * Generates a deterministic token (hash) for a given value.
 * This ensures the same input always yield the same masked output (tokenization).
 * @param value The sensitive string value to be tokenized.
 * @returns A fixed-length, deterministic token string.
 */
export function generateDeterministicToken(value: string): string {
  // Use SHA-256 for a strong, fixed-length hash
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex').substring(0, 32);
}

/**
 * Generates a non-deterministic (random) placeholder token.
 * @returns A random 16-character token.
 */
export function generateRandomToken(): string {
  return crypto.randomBytes(8).toString('hex');
}