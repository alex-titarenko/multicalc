/**
 * Represents various functions of number theory.
 */
export class NumberTheory {
  /**
   * Returns the greatest common divisor of two integer numbers.
   * @param a - An integer number.
   * @param b - An integer number.
   */
  public static gcd2(a: number, b: number): number {
    while (b !== 0) {
      const temp = a % b;
      a = b;
      b = temp;
    }

    return Math.abs(a);
  }

  /**
   * Returns the greatest common divisor of an array of integer numbers.
   * @param numbers - An array of integer numbers.
   */
  public static gcd(...numbers: number[]): number {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      result = NumberTheory.gcd2(result, numbers[i]);
    }

    return result;
  }

  /**
   * Returns the least common multiple of two integer numbers.
   * @param a - An integer number.
   * @param b - An integer number.
   */
  public static lcm2(a: number, b: number): number {
      return (a * b) / NumberTheory.gcd(a, b);
  }

  /**
   * Returns the least common multiple of an array of integer numbers.
   * @param numbers - An array of integer numbers.
   */
  public static lcm(... numbers: number[]): number {
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      result = NumberTheory.lcm2(result, numbers[i]);
    }

    return result;
  }

  /**
   * Returns a value that indicates whether an integer number is even.
   * @param n - An integer number.
   * @returns true if the number n is even; false otherwise.
   */
  public static isEven(n: number): boolean {
    // tslint:disable-next-line:no-bitwise
    return ((n & 1) === 0);
  }

  /**
   * Returns a value that indicates whether an integer number is odd.
   * @param n - An integer number.
   * @returns true if the number n is odd; false otherwise.
   */
  public static isOdd(n: number): boolean {
    // tslint:disable-next-line:no-bitwise
    return ((n & 1) !== 0);
  }
}
