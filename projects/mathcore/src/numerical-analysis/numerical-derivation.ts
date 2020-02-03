import { Complex } from 'mathcore/complex';
import { Func } from 'mathcore/func';
import { ArgumentError } from 'mathcore/errors/argument-error';
import { NotConvergenceError } from '../errors/not-convergence-error';

/**
 * A delegate to a function that represents the difference quotient.
 */
type DifferenceQuotient = (func: Func<Complex>, c: Complex, h: number) => Complex;

interface DerivationResult {
  ans: Complex;
  err: number;
}

/**
 * Represents numerical differentiation of the first, second, third and fourth orders.
 */
export class NumericalDerivation {
  private static readonly ntab = 50;                        // Sets maximum size of tableau.
  private static readonly con = 1.4;                     // Stepsize is decreased by CON at each iteration.
  private static readonly con2 = NumericalDerivation.con * NumericalDerivation.con;
  private static readonly safe = 2.0;                    // Return when error is SAFE worse than the best so far.
  private static readonly tol = 1E-6;


  /**
   * Returns the value of the central derivative of the first order.
   * @param func A target complex function.
   * @param c A point at which the derivative is calculated.
   */
  public static firstDerivative(func: Func<Complex>, c: Complex): Complex {
    const h = 0.01 + 1E-16;
    const result = NumericalDerivation.ridersDerivation(func, NumericalDerivation.centralFirstDerivative3Points, c, h);
    return result.ans;
  }

  /**
   * Returns the value of the central derivative of the second order.
   * @param func A target complex function.
   * @param c A point at which the derivative is calculated.
   */
  public static secondDerivative(func: Func<Complex>, c: Complex): Complex {
    const h = 0.01 + 1E-16;
    const result = NumericalDerivation.ridersDerivation(func, NumericalDerivation.centralSecondDerivative3Points, c, h);
    return result.ans;
  }

  /**
   * Returns the value of the central derivative of the third order.
   * @param func A target complex function.
   * @param c A point at which the derivative is calculated.
   */
  public static thirdDerivative(func: Func<Complex>, c: Complex): Complex {
    const h = 0.01 + 1E-16;
    const result = NumericalDerivation.ridersDerivation(func, NumericalDerivation.centralThirdDerivative3Points, c, h);
    return result.ans;
  }

  /**
   * Returns the value of the central derivative of the fourth order.
   * @param func A target complex function.
   * @param c A point at which the derivative is calculated.
   */
  public static fourthDerivative(func: Func<Complex>, c: Complex): Complex {
    const h = 0.1 + 1E-16;
    const result = NumericalDerivation.ridersDerivation(func, NumericalDerivation.centralFourthDerivative5Points, c, h);
    return result.ans;
  }

  /**
   * Returns the derivative of a complex function at a point x by Ridders' method of polynomial
   * extrapolation. The value h is input as an estimated initial stepsize; it need not be small, but
   * rather should be an increment in x over which func changes substantially. An estimate of the
   * error in the derivative is returned as err.
   * @param func A target complex function.
   * @param difference A complex function represents the difference quotient.
   * @param x A point at which the derivative is calculated.
   * @param h An estimated initial stepsize.
   * @returns Numerical approximation of the value of the derivative of function at point x and an extimate of the error.
   */
  private static ridersDerivation(func: Func<Complex>, difference: DifferenceQuotient, x: Complex, h: number): DerivationResult {
    if (Complex.isNaN(func(x)) || Complex.isInfinity(func(x))) {
      return { ans: Complex.NaN, err: Number.MAX_VALUE };
    }

    let errt: number;
    let fac: number;
    let hh: number;
    let ans = Complex.zero;

    if (h === 0.0) {
      throw new ArgumentError('h must be nonzero.');
    }

    const a = NumericalDerivation.initData(NumericalDerivation.ntab);

    hh = h;
    a[0][0] = difference(func, x, hh);
    let err = Number.MAX_VALUE;

    for (let i = 1; i < NumericalDerivation.ntab; i++) {
      // Successive columns in the Neville tableau will go to smaller stepsizes and higher orders of
      // extrapolation.

      hh = hh / NumericalDerivation.con;
      a[0][i] = difference(func, x, hh);      // Try new, smaller stepsize.
      fac = NumericalDerivation.con2;

      // Compute extrapolations of various orders, requiring no new function evaluations.
      for (let j = 1; j <= i; j++) {
        a[j][i] = Complex.div(a[j - 1][i].mult(Complex.fromReal(fac)).sub(a[j - 1][i - 1]), Complex.fromReal(fac - 1.0));
        fac = NumericalDerivation.con2 * fac;
        errt = Math.max(Complex.abs(Complex.sub(a[j][i], a[j - 1][i])), Complex.abs(Complex.sub(a[j][i], a[j - 1][i - 1])));

        // The error strategy is to compare each new extrapolation to one order lower, both
        // at the present stepsize and the previous one.

        // If error is decreased, save the improved answer.
        if (errt <= err) {
          err = errt;
          ans = a[j][i];
        }
      }

      // If higher order is worse by a significant factor SAFE, then quit early.
      if (
        Complex.abs(Complex.sub(a[i][i], a[i - 1][i - 1])) >= NumericalDerivation.safe * err &&
        err <= NumericalDerivation.tol * Complex.abs(ans)) {
          return { ans: ans, err: err };
      }
    }

    throw new NotConvergenceError('Calculation does not converge to a solution.');
  }

  private static initData(size: number): Complex[][] {
    const a: Complex[][] = [];
    a.length = size;

    for (let i = 0; i < size; i++) {
      a[i] = [];
      a[i].length = size;

      for (let j = 0; j < size; j++) {
        a[i][j] = Complex.zero;
      }
    }

    return a;
  }

  private static centralFirstDerivative3Points(func: Func<Complex>, value: Complex, h: number): Complex {
    return Complex.div(
      Complex.sub(func(Complex.addNumber(value, h)), func(Complex.subNumber(value, h))),
      Complex.fromReal(2.0 * h)
    );
  }

  private static centralSecondDerivative3Points(func: Func<Complex>, value: Complex, h: number): Complex {
    return Complex.div(
      func(Complex.subNumber(value, h)).sub(Complex.mult(Complex.fromReal(2), func(value))).add(func(Complex.addNumber(value, h))),
      Complex.fromReal(h * h)
    );
  }

  private static centralThirdDerivative3Points(func: Func<Complex>, value: Complex, h: number): Complex {
    return Complex.div(
      Complex.negate(func(Complex.subNumber(value, 2 * h)))
        .add(Complex.mult(Complex.fromReal(2), func(Complex.subNumber(value, h))))
        .sub(Complex.mult(Complex.fromReal(2), func(Complex.addNumber(value, h))))
        .add(func(Complex.addNumber(value, 2 * h))),
      Complex.fromReal(2 * h * h * h)
    );
  }

  private static centralFourthDerivative5Points(func: Func<Complex>, value: Complex, h: number): Complex {
    return Complex.div(
      func(Complex.addNumber(value, 2 * h))
        .sub(Complex.mult(Complex.fromReal(4), func(Complex.addNumber(value, h))))
        .add(Complex.mult(Complex.fromReal(6), func(value)))
        .sub(Complex.mult(Complex.fromReal(4), func(Complex.subNumber(value, h))))
        .add(func(Complex.subNumber(value, 2 * h))),
      Complex.fromReal(h * h * h * h));
  }
}
