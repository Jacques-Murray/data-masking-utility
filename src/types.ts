export type MaskingStrategy = 'partial' | 'full' | 'token';

export interface MaskingRule {
  keys: string[]; // Keys to apply the rule to (e.g., ['email', 'user.data.email'])
  strategy: MaskingStrategy;
  maskChar?: string; // Character to use for masking (default: '*')
  showLast?: number; // Number of characters to show from the end (default: 4)
}

export interface MaskingConfig {
  rules: MaskingRule[];
}