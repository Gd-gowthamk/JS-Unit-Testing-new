interface IQuantityValidator {
  validate(quantity: number): { isValid: boolean; error: string | null };
}

export class QuantityValidator implements IQuantityValidator {

  private threshold: number;
  private packageSize: number;
  constructor(threshold: number, packageSize: number) {
    if (threshold < 0) {
      throw new Error('Invalid threshold');
    }
    if (packageSize <= 0) {
      throw new Error('Invalid packageSize');
    }
    this.threshold = threshold;
    this.packageSize = packageSize;
  }

  public validate(quantity: number): { isValid: boolean; error: string | null } {
    if (quantity <= 0) {
      return { isValid: false, error: 'Quantity should be greater than zero' };
    }

    if (quantity < this.threshold) {
      return { isValid: true, error: null };
    }

    if (quantity % this.packageSize !== 0) {
      return { isValid: false, error: `Quantity should be divisible by ${this.packageSize}` };
    }

    return { isValid: true, error: null };
  }

}