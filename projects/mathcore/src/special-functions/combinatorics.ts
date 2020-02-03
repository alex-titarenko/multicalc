import { ArgumentError } from 'mathcore/errors/argument-error';
import { NumberTheory } from './number-theory';

const factLen = 171;
const factNums: number[] = [];

export function initFactorialNumbers() {
  return (ctor: Function) => {
    if (factNums.length === 0) {
      let result = 1.0;
      factNums[0] = 1.0;

      for (let n = 1; n < factLen; n++) {
        result = result * n;
        factNums[n] = result;
      }
    }
  };
}

/**
 * Represents various combinatorial functions.
 */
@initFactorialNumbers()
export class Combinatorics {
  /**
   * Returns the factorial of a positive integer.
   * @param n - A positive integer number.
   * @throws {ArgumentError} n less than zero.
   */
  public static factorial(n: number): number {
    if (n < 0) {
      throw new ArgumentError('The value of n must be nonnegative.');
    }

    if (n < factLen) {
      return factNums[n];
    } else {
      return Number.POSITIVE_INFINITY;
    }
  }

  /**
   * Returns the number of ways of picking k unordered outcomes from n possibilities.
   * @param n - An integer number.
   * @param k - An integer number.
   * @throws {ArgumentError} n or k less that zero or n less that k.
   */
  public static combinations(n: number, k: number): number {
    if (n < 0 || k < 0) {
      throw new ArgumentError('The values of n and k must be nonnegative.');
    }
    if (n < k) {
      throw new ArgumentError('The value of n must be greater that or equal to k.');
    }

    return Combinatorics.factorial(n) / (Combinatorics.factorial(k) * Combinatorics.factorial(n - k));
  }

  /**
   * Returns the number of ways of obtaining an ordered subset of k elements from a set of n elements.
   * @param n - An integer number.
   * @param k - An integer number.
   * @throws {ArgumentError} n or k less that zero or n less that k.
   */
  public static permutations(n: number, k: number): number {
    if (n < 0 || k < 0) {
      throw new ArgumentError('The values of n and k must be nonnegative.');
    }

    if (n < k) {
      throw new ArgumentError('The value of n must be greater that or equal to k.');
    }

    return Combinatorics.factorial(n) / Combinatorics.factorial(n - k);
  }

  /**
   * Returns the n-th Fibonacci number.
   * @param n - The index of the number in the Fibonacci sequence.
   */
  public static fibonacci(n: number): number {
    if (n < 0) {
      if (NumberTheory.isEven(n)) {
        return -Combinatorics.fibonacci(-n);
      }

      return Combinatorics.fibonacci(-n);
    }

    if (n === 0) {
      return 0;
    }

    if (n <= 2) {
      return 1;
    }

    if (n > 1477) {
      return Number.POSITIVE_INFINITY;
    }

    let f1 = 1;
    let f2 = 2;

    while (n-- > 3) {
      const f = f1 + f2;
      f1 = f2;
      f2 = f;
    }

    return f2;
  }
}
