import { maskString } from "./common";
import { maskEmail } from "./email";
import { maskPhoneNumber } from "./phone";
import { generateDeterministicToken } from "./tokenizer";

describe('Masking Utilities (Unit Tests)', () => {

  describe('maskString', () => {
    it('should mask the prefix of a string, showing the last 4 characters by default', () => {
      expect(maskString('1234567890', '*', 4)).toBe('******7890');
    });

    it('should handle custom mask characters', () => {
      expect(maskString('SensitiveData', '#', 3)).toBe('###########ata');
    });

    it('should return the original string if length is less than or equal to showLast', () => {
      expect(maskString('123', '*', 4)).toBe('123');
    });
  });

  describe('maskEmail', () => {
    it('should mask the local part of a standard email address', () => {
      expect(maskEmail('testuser@example.com', '*')).toBe('t*******@example.com');
    });

    it('should mask the local part of a complex email address with periods', () => {
      // Logic is to show the first character and the character after the first dot
      expect(maskEmail('first.last.name@domain.com', '*')).toBe('f****l********e@domain.com');
    });

    it('should handle short local parts', () => {
      expect(maskEmail('a@b.com')).toBe('a@b.com'); // a is length 1, no masking needed
      expect(maskEmail('ab@c.com')).toBe('a*@c.com');
    });

    it('should return non-string values as is', () => {
      expect(maskEmail(null as any)).toBe(null);
    });
  });

  describe('maskPhoneNumber', () => {
    it('should mask a standard 10-digit number, showing the last 4', () => {
      expect(maskPhoneNumber('1234567890', '*')).toBe('******7890');
    });

    it('should preserve non-digit characters while masking the digits', () => {
      expect(maskPhoneNumber('(123) 456-7890', '#', 4)).toBe('(###) ###-7890');
    });

    it('should handle masking a short number with a custom showLast count', () => {
      expect(maskPhoneNumber('12345', '*', 2)).toBe('***45');
    });

    it('should return non-string values as is', () => {
      expect(maskPhoneNumber(12345 as any)).toBe(12345);
    });
  });

  describe('generateDeterministicToken', () => {
    it('should generate a 16-character token', () => {
      expect(generateDeterministicToken('test')).toHaveLength(32); // SHA256 substring(0, 16) in hex is 32 chars
    });

    it('should generate the same token for the same input', () => {
      const token1 = generateDeterministicToken('SensitiveData123');
      const token2 = generateDeterministicToken('SensitiveData123');
      expect(token1).toBe(token2);
    });

    it('should generate different tokens for different inputs', () => {
      const token1 = generateDeterministicToken('SensitiveData123');
      const token2 = generateDeterministicToken('DifferentData456');
      expect(token1).not.toBe(token2);
    });
  });
});