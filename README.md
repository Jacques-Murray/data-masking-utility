# Data Masking Utility

A TypeScript utility for masking sensitive data like email addresses, phone numbers, and credit cards.

## Installation

```bash
npm install data-masking-utility
```

## Usage

### CommonJS

```javascript
const { maskEmail, maskPhone, maskCreditCard } = require('data-masking-utility');

console.log(maskEmail('john.doe@example.com'));        // j******e@example.com
console.log(maskPhone('1234567890'));                  // ******7890
console.log(maskCreditCard('1234 5678 9012 3456'));   // ************3456
```

### ES Modules

```javascript
import { maskEmail, maskPhone, maskCreditCard } from 'data-masking-utility';

console.log(maskEmail('john.doe@example.com'));        // j******e@example.com
console.log(maskPhone('1234567890'));                  // ******7890
console.log(maskCreditCard('1234 5678 9012 3456'));   // ************3456
```

## API

### `maskEmail(email: string): string`

Masks an email address by replacing characters in the username with asterisks, keeping the first and last characters visible.

### `maskPhone(phone: string): string`

Masks a phone number by replacing all but the last 4 digits with asterisks.

### `maskCreditCard(cardNumber: string): string`

Masks a credit card number by showing only the last 4 digits.

## Development

### Build

```bash
npm run build
```

This will generate both CommonJS and ESM builds:
- CommonJS: `dist/index.js`
- ESM: `dist/esm/index.js`
- TypeScript declarations: `dist/index.d.ts`

### Test

```bash
npm test
```

## TypeScript Configuration

This package supports dual module formats (CommonJS and ESM) using separate TypeScript configurations:

- `tsconfig.json` - Base configuration for CommonJS build
- `tsconfig.esm.json` - ESM-specific configuration that extends the base config

### Fixed Issues

The ESM build previously failed with these errors:

1. **TS5069**: `declarationDir` cannot be specified without `declaration` or `composite`
   - **Fix**: Removed redundant `declarationDir` from base config and set `declaration: false` in ESM config

2. **TS5023**: Unknown compiler option `filename`
   - **Fix**: Removed invalid `filename` option from ESM config

## License

MIT
