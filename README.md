# data-masking-utility

A high-performance, zero-dependency utility for masking sensitive data (PII) in strings and JSON objects.

## Installation

```bash
npm install data-masking-utility
# or
yarn add data-masking-utility
```

## Usage

The utility works by defining a set of **Masking Rules** and the applying those rules to your data.

**1. Define Rules**

Define which keys in your objects should be masked and with what strategy.

```TypeScript
import { createDataMasker, MaskingStrategy, MaskingOptions } from 'data-masking-utility';

const maskingOptions: MaskingOptions = {
  rules: [
    {
      // Specific masking for standard fields
      keys: ['email', 'userEmail'],
      strategy: 'partial',
    },
    {
      // Full masking for sensitive IDs
      keys: ['ssn', 'userId'],
      strategy: 'full',
      maskChar: '#',
    },
    {
      // Phone number masking with custom visibility
      keys: ['phone'],
      strategy: 'partial',
      showLast: 3,
    },
    {
      // Tokenization (replacement) for data that needs to be completely removed
      keys: ['password'],
      strategy: 'token',
    },
  ],
};

const masker = createDataMasker(maskingOptions);
```

**2. Apply Masker**

Use the `masker` function on any object or array of objects. The utility handles **nested**
structures automatically.

```TypeScript
const sensitiveData = {
  id: '811-123',
  name: 'Jane Doe',
  userEmail: 'jane.doe@example.com',
  ssn: '123-45-6789',
  contact: {
    phone: '(555) 123-9876',
    address: '123 Main St',
  },
};

const maskedData = masker(sensitiveData);

console.log(maskedData);

/*
Output:
{
  id: '###-###',
  name: 'Jane Doe',
  userEmail: 'j***.d***@example.com',
  ssn: '###-##-####',
  contact: {
    phone: '(***) ***-9876', // Last 4 digits shown
    address: '123 Main St.',
  },
}
*/
```

## API Reference

`createDataMasker(options: MaskingOptions): (data: any) => any`

The main factory function. It takes configuration options and returns as bound masking function.

## Types

| Interface | Description |
|-----------|-------------|
| `MaskingOptions` | The root configuration object containing the `rules` array. |
| `MaskingRule` | Defines how a field should be masked. |
| `MaskingStrategy` | Union type: `'partial'`, `'full'`, `'token'`. |
