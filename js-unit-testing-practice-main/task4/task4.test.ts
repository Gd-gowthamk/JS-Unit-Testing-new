import { validateMathExpression } from './index';

describe('task4 ', () => {
// Positive scenarios
  const positiveCases = [
    '2+2',
    '3*value',
    '(5+6)/2',
    '10-3^2',
    'value*3.5'
  ];

  test.each(positiveCases)('should return true for valid input: "%s"', (input) => {
    expect(validateMathExpression(input)).toBe(true);
  });

  // Negative scenarios
  const negativeCases = [
    '++2',     
    '5*/3',
    'value 3',
    '3..5+2',
    '3+*2'
  ];

  test.each(negativeCases)('should return false for invalid input: "%s"', (input) => {
    expect(validateMathExpression(input)).toBe(false);
  });

});
