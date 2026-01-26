
import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {

  // Constructor validation
  describe('constructor', () => {
    it('should throw an error if threshold is negative', () => {
      expect(() => new QuantityValidator(-1, 5)).toThrow('Invalid threshold');
    });

    it('should throw an error if packageSize is zero', () => {
      expect(() => new QuantityValidator(10, 0)).toThrow('Invalid packageSize');
    });

    it('should throw an error if packageSize is negative', () => {
      expect(() => new QuantityValidator(10, -5)).toThrow('Invalid packageSize');
    });

    it('should create an instance if threshold and packageSize are valid', () => {
      const validator = new QuantityValidator(10, 5);
      expect(validator).toBeInstanceOf(QuantityValidator);
    });
  });

  // Validate method
  describe('validate()', () => {
    let validator: QuantityValidator;

    beforeEach(() => {
      validator = new QuantityValidator(10, 5);
    });

    it('should return valid if quantity is less than threshold', () => {
      const result = validator.validate(5);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return valid if quantity equals threshold and divisible by packageSize', () => {
      const result = validator.validate(10); // threshold 10, packageSize 5
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return invalid if quantity equals threshold and not divisible by packageSize', () => {
      const result = validator.validate(11);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity should be divisible by 5');
    });

    it('should return valid if quantity exceeds threshold and divisible by packageSize', () => {
      const result = validator.validate(15);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return invalid if quantity exceeds threshold and not divisible by packageSize', () => {
      const result = validator.validate(16);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity should be divisible by 5');
    });

    it('should return invalid if quantity is zero', () => {
      const result = validator.validate(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity should be greater than zero');
    });

    it('should return invalid if quantity is negative', () => {
      const result = validator.validate(-3);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity should be greater than zero');
    });
  });
});
