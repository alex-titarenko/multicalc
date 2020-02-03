import { Complex } from './complex';
import { FormatError } from './errors/format-error';

/** Represents various numerical utilities. */
export class NumericUtils {
  private static readonly complexNumberPattern = /^[+-]?[0-9.]+[ij]?$/;

  /**
   * Represents the machine epsilon for double-precision floating-point numbers.
   * Machine epsilon gives an upper bound on the relative error due to rounding in floating point arithmetic.
   */
  public static readonly epsilon = 2.2204460492503131E-16;

  private static readonly maxComplexZeroThreshold = 307;

  /**
   * Returns are much larger the real or imaginary part of a complex number.
   * If the ratio of real and imaginary parts of complex number are not so large
   * returns the initial value.
   * @param value - A complex number.
   * @param complexThreshold - An integer representing the complex threshold.
   * @returns Are much larger the real or imaginary part of the value.
   * If the ratio of real and imaginary parts of the value are not so large
   * returns the value.
   * @throws {RangeError} complexThreshold must be between 0 and 307.
   */
  public static complexThreshold(value: Complex, complexThreshold: number): Complex {
    if (complexThreshold < 0 || complexThreshold > NumericUtils.maxComplexZeroThreshold) {
      throw new RangeError(`Complex threshold must be between 0 and ${NumericUtils.maxComplexZeroThreshold}.`);
    }

    if (value.isReal || value.isImaginary) {
      return value;
    }

    const d = Math.pow(10, complexThreshold);

    const reAbs = Math.abs(value.real);
    const imAbs = Math.abs(value.imag);

    if ((reAbs > imAbs) && (reAbs / imAbs > d)) {
      return new Complex(value.real, 0.0);
    } else if ((imAbs > reAbs) && (imAbs / reAbs > d)) {
      return new Complex(0.0, value.imag);
    }

    return value;
  }

  /**
   * Returns a zero value if the initial value is close to it.
   * Otherwise, returns the initial value.
   * @param value - A real or complex number.
   * @param zeroThreshold - An integer representing the zero threshold.
   * @throws {RangeError} - zeroThreshold must be between 0 and 307.
   */
  public static zeroThreshold(value: number | Complex, zeroThreshold: number): number | Complex {
    if (zeroThreshold < 0 || zeroThreshold > NumericUtils.maxComplexZeroThreshold) {
      throw new RangeError(`The zero threshold must be between 0 and ${NumericUtils.maxComplexZeroThreshold}.`);
    }

    const d = Math.pow(10, -zeroThreshold);

    if (typeof value === 'number') {
      return (Math.abs(value) < d) ? 0.0 : value;
    }

    const re = (Math.abs(value.real) < d) ? 0.0 : value.real;
    const im = (Math.abs(value.imag) < d) ? 0.0 : value.imag;

    return new Complex(re, im);
  }

  /**
   * Applies the complex and zero threshold for a complex number and returns the result.
   * @param value - A complex number.
   * @param complexThreshold - An integer representing the complex threshold.
   * @param zeroThreshold - An integer representing the zero threshold.
   * @throws {RangeError} complexThreshold and zeroThreshold must be between 0 and 307.
   */
  public static complexZeroThreshold(value: Complex, complexThreshold: number, zeroThreshold: number): Complex {
    return <Complex>NumericUtils.zeroThreshold(NumericUtils.complexThreshold(value, complexThreshold), zeroThreshold);
  }

  /**
   * Returns a value that indicates whether the two double numbers are equal with the specified relative tolerance.
   * @param value1 - The first double value to fuzzy compare.
   * @param value2 - The second double value to fuzzy compare.
   * @param relativeTolerance - A double value that represents the relative tolerance for compare.
   * @returns true if the value1 and value2 are fuzzy equal with the specified relative tolerance; otherwise false.
   */
  public static fuzzyEquals(value1: number, value2: number, relativeTolerance: number): boolean {
    if (value1 === value2) {
      return true;
    }

    if (value1 === 0 || value2 === 0) {
      return Math.abs(value1 - value2) <= relativeTolerance;
    }

    return Math.abs(value1 - value2) <= relativeTolerance * Math.max(Math.abs(value1), Math.abs(value2));
  }

  /**
   * Returns a value that indicates whether the two complex numbers are equal with the specified relative tolerance.
   * @param value1 - The first complex number to fuzzy compare.
   * @param value2 - The second complex number to fuzzy compare.
   * @param relativeTolerance - A double value that represents the relative tolerance for compare.
   * @returns true if the value1 and value2 are fuzzy equal with the specified relative tolerance; otherwise false.
   */
  public static fuzzyEqualsComplex(value1: Complex, value2: Complex, relativeTolerance: number): boolean {
    if (value1.equals(value2)) {
      return true;
    }

    if (value1.isZero || value2.isZero) {
      return Complex.abs(Complex.sub(value1, value2)) <= relativeTolerance;
    }

    return Complex.abs(Complex.sub(value1, value2)) <= relativeTolerance * Math.max(Complex.abs(value1), Complex.abs(value2));
  }

  /**
   * Returns whether or not two doubles are "close".  That is, whether or
   * not they are within epsilon of each other.  Note that this epsilon is proportional
   * to the numbers themselves to that AreClose survives scalar multiplication.
   * There are plenty of ways for this to return false even for numbers which
   * are theoretically identical, so no code calling this should fail to work if this
   * returns false.
   * @param value1 - The first double value to compare.
   * @param value2 - The second double value to compare.
   */
  public static areClose(value1: number, value2: number): boolean {
    // in case they are Infinities (then epsilon check does not work)
    if (value1 === value2) {
      return true;
    }

    // This computes (|value1-value2| / (|value1| + |value2| + 10.0)) < DBL_EPSILON
    const eps = (Math.abs(value1) + Math.abs(value2) + 10.0) * NumericUtils.epsilon;
    const delta = value1 - value2;
    return (-eps < delta) && (eps > delta);
  }

  /**
   * Converts a number to its equivalent string representation.
   * @param n - A real number.
   * @param decimalPlaces - Number of digits after the decimal point.
   * @param numericFormat - String which represents format for the number:
   * (E - Exponential, F - Fixed, G - General).
   */
  public static formatNumber(n: number, decimalPlaces: number, numericFormat: string, useGrouping: boolean = true): string {
    switch (numericFormat.toUpperCase()) {
      case 'E':
        return n.toExponential(decimalPlaces);

      case 'F':
        return n.toFixed(decimalPlaces);

      case 'G':
        const abs_n = Math.abs(n);
        if (abs_n > 10E15 || abs_n < 10E-7) {
          return NumericUtils.toExponential(n, decimalPlaces);
        } else {
          return n.toLocaleString('en-US', { maximumFractionDigits: decimalPlaces, useGrouping: useGrouping });
        }

      default:
        throw new FormatError(`${numericFormat} is not supported.`);
    }
  }

  /**
   * Returns a string containing a number represented in exponential notation.
   * @param n - The real number
   * @param maxFractionDigits - The maximum number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  public static toExponential(n: number, maxFractionDigits: number): string {
    return NumericUtils.removeTrailingZeros(n.toExponential(maxFractionDigits));
  }

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   * @param n - The real number
   * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive.
   */
  public static toPrecision(n: number, precision: number): string {
    return NumericUtils.removeTrailingZeros(n.toPrecision(precision));
  }

  /**
   * Removes trailing zeros from a string which represents a real number.
   * @param s - The string which represents a real number.
   */
  public static removeTrailingZeros(s: string): string {
    if (s.indexOf('.') !== -1) {
      let eIndex = s.indexOf('e');
      if (eIndex === -1) {
        eIndex = s.length;
      }
      let trimStart: number;
      for (trimStart = eIndex - 1; s[trimStart] === '0'; trimStart--) {}
      if (s[trimStart] === '.') {
        trimStart--;
      }

      return s.substring(0, trimStart + 1) + s.substring(eIndex, s.length);
    }

    return s;
  }

  /**
   * Returns a boolean value which indicates whether a string represents a number.
   * @param s - A string to check for a complex number.
   */
  public static isComplexNumber(s: string): boolean {
    return NumericUtils.complexNumberPattern.test(s);
  }

  /**
   * Generate a string which represents the universally unique identifier.
   */
  public static generateGuid(): string {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
