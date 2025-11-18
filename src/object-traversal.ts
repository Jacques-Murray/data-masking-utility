import { MaskingRule, MaskingStrategy } from './types';
import { maskString } from './masks/common';
import { generateDeterministicToken } from './masks/tokenizer';

// Simple function to apply a mask based on strategy
function applyRule(value: any, rule: MaskingRule): any {
  if (typeof value !== 'string') {
    return value; // Only mask strings for this basic example
  }

  const maskChar = rule.maskChar ?? '*';
  const showLast = rule.showLast ?? 4;

  switch (rule.strategy) {
    case 'partial':
      return maskString(value, maskChar, showLast);
    case 'full':
      return maskChar.repeat(value.length);
    case 'token':
      return generateDeterministicToken(value);
    default:
      return value;
  }
}

// Recursively traverse the object and apply rules
export function maskObject(data: any, rules: MaskingRule[]): any {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => maskObject(item, rules))
  }

  const maskedData: Record<string, any> = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      // Check for matching rule based on the current key name
      const matchingRule = rules.find((rule) => rule.keys.includes(key));

      if (matchingRule) {
        maskedData[key] = applyRule(value, matchingRule);
      } else if (typeof value === 'object' && value !== null) {
        // Recurse into nested objects/arrays
        maskedData[key] = maskObject(value, rules);
      } else {
        maskedData[key] = value;
      }
    }
  }

  return maskedData;
}