export class ExMath {
  /** Represents the square root of pi. */
  public static readonly sqrtPi = 1.7724538509055161;

  /**
   * Calculates the integral part of a specified real number.
   * @param d - A number to truncate.
   * @returns the integral part of d; that is, the number that remains after any fractional digits have been discarded.
   */
  public static truncate(d: number): number {
    return (d > 0) ? Math.floor(d) : Math.ceil(d);
  }
}
