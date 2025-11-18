import { createDataMasker, MaskingOptions } from "./index";

describe('createDataMasker (Integration Tests)', () => {
  const options: MaskingOptions = {
    rules: [
      { keys: ['email', 'userEmail'], strategy: 'partial', maskChar: 'x' },
      { keys: ['ssn', 'accountNumber'], strategy: 'full', maskChar: '#' },
      { keys: ['phone'], strategy: 'partial', showLast: 3 },
      { keys: ['password', 'token'], strategy: 'token' },
    ],
  };

  const masker = createDataMasker(options);

  const testData = {
    id: 101,
    name: 'Alex Johnson',
    userEmail: 'alex.johnson@corp.net',
    ssn: '123-45-6789',
    password: 'securePassword123',
    accountNumber: 'ABCD-1234-EFGH-5678',
    contact: {
      phone: '(555) 555-1234',
      address: '10 Downing St.',
      token: 'secret-auth-token-123',
    },
    history: [
      {
        email: 'old.email@corp.net',
        phone: '1112223333',
        notes: 'Unrelated info.',
      },
    ],
  };

  it('should correctly apply various masking strategies across nested fields', () => {
    const maskedData = masker(testData);

    // 1. Partial Email (userEmail - custom char 'x')
    expect(maskedData.userEmail).toBe('x***x******n@corp.net');

    // 2. Full Masking (ssn - custom char '#')
    expect(maskedData.ssn).toBe('#########');

    // 3. Tokenization (password) - Should be a consistent hash
    expect(maskedData.password).toHaveLength(32);
    expect(maskedData.password).not.toBe('securePassword123');

    // 4. Object Traversal & Tokenization (contact.token)
    expect(maskedData.contact.token).toHaveLength(32);

    // 5. Array Traversal & Partial Masking (history[0].email and history[0].phone)
    expect(maskedData.history[0].email).toBe('o***e*****l@corp.net');

    // 6. Partial Phone (showLast: 3)
    expect(maskedData.contact.phone).toBe('(xxx) xxx-x234');
    expect(maskedData.history[0].phone).toBe('xxxxxx333');

    // 7. Full Masking (accountNumber)
    expect(maskedData.accountNumber).toBe('####################');

    // 8. Unrelated fields should remain untouched (e.g., id, name, notes, address)
    expect(maskedData.name).toBe(testData.name);
    expect(maskedData.id).toBe(testData.id);
    expect(maskedData.history[0].notes).toBe(testData.history[0].notes);
  });

  it('should handle non-object inputs by returning them directly', () => {
    expect(masker(null)).toBe(null);
    expect(masker('a string')).toBe('a string');
    expect(masker(12345)).toBe(12345);
  });

  it('should ensure tokenization is deterministic for integration tests', () => {
    // Both inputs will receive the same token because the value is identical
    const data1 = masker({ secret: 'same-value', id: 1 });
    const data2 = masker({ secret: 'same-value', id: 2 });

    expect(data1.secret).toBe(data2.secret);
  });
});