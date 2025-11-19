/**
 * Simple test to verify the data masking utility functions work correctly
 */

import { maskEmail, maskPhone, maskCreditCard } from '../dist/index.js';

console.log('Testing Data Masking Utility...\n');

// Test maskEmail
const testEmail = 'john.doe@example.com';
const maskedEmail = maskEmail(testEmail);
console.log(`Email: ${testEmail} -> ${maskedEmail}`);
if (!maskedEmail.includes('j') || !maskedEmail.includes('e@example.com')) {
  throw new Error('maskEmail test failed');
}
console.log('✓ maskEmail test passed\n');

// Test maskPhone
const testPhone = '1234567890';
const maskedPhone = maskPhone(testPhone);
console.log(`Phone: ${testPhone} -> ${maskedPhone}`);
if (!maskedPhone.endsWith('7890') || maskedPhone.length !== testPhone.length) {
  throw new Error('maskPhone test failed');
}
console.log('✓ maskPhone test passed\n');

// Test maskCreditCard
const testCard = '1234 5678 9012 3456';
const maskedCard = maskCreditCard(testCard);
console.log(`Card: ${testCard} -> ${maskedCard}`);
if (!maskedCard.endsWith('3456')) {
  throw new Error('maskCreditCard test failed');
}
console.log('✓ maskCreditCard test passed\n');

console.log('All tests passed! ✓');
