import { Complex } from 'mathcore/complex';
import { Func } from 'mathcore/func';
import { NotConvergenceError } from 'mathcore/errors/not-convergence-error';

export class Sequence {
  private static readonly maxIters = 100;

  public static summation(term: Func<Complex>, m: number, n: number): Complex {
    let sum = Complex.zero;

    for (let i = m; i <= n; i++) {
      sum = sum.add(term(Complex.fromReal(i)));
    }

    return sum;
  }

  public static infiniteSummation(term: Func<Complex>, m: number, relativeTolerance: number): Complex {
    const tolsq = relativeTolerance * relativeTolerance;

    let sum = Complex.zero;

    for (let i = m; i <= Sequence.maxIters; i++) {
      const termValue = term(Complex.fromReal(i));
      sum = sum.add(termValue);

      if (Complex.absSquared(Complex.div(termValue, sum)) <= tolsq) {
        return sum;
      }
    }

    throw new NotConvergenceError();
  }

  public static product(term: Func<Complex>, m: number, n: number): Complex {
    let product = Complex.one;

    for (let i = m; i <= n; i++) {
      product = product.mult(term(Complex.fromReal(i)));
    }

    return product;
  }

  public static infiniteProduct(term: Func<Complex>, m: number, relativeTolerance: number): Complex {
    const tolsq = relativeTolerance * relativeTolerance;
    let product = Complex.one;

    for (let i = m; i < Sequence.maxIters; i++) {
      const termValue = term(Complex.fromReal(i));
      product = product.mult(termValue);

      if (Complex.absSquared(Complex.div(termValue, product)) <= tolsq) {
        return product;
      }
    }

    throw new NotConvergenceError();
  }
}
