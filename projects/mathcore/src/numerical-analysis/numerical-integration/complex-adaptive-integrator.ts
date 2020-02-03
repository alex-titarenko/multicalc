import { ComplexCompositeIntegrator } from './complex-composite-integrator';
import { GaussKronrodQuadratures } from './gauss-kronrod-quadratures';
import { Func } from 'mathcore/func';
import { Complex } from 'mathcore/complex';
import { NotConvergenceError } from 'mathcore/errors/not-convergence-error';


/**
 * A delegate to a function that represents the quadrature formula of integration.
 */
type Quadrature = (integrand: Func<Complex>, lowerBound: number, upperBound: number) => Complex;


enum LimitType {
    LowerBoundInfinity,
    UpperBoundInfinity,
    BothBoundsInfinity
}


/**
 * Represents transforms the infinite interval to a finite interval.
 */
class TransformationLimits {
  public readonly finiteIntegrand: Func<Complex>;

  constructor(private infinityIntegrand: Func<Complex>, limitType: LimitType, private limit: number) {
    switch (limitType) {
      case LimitType.LowerBoundInfinity:
        this.finiteIntegrand = this.lowerBoundInfinityTransform;
        break;

      case LimitType.BothBoundsInfinity:
        this.finiteIntegrand = this.bothBoundsInfinityTransform;
        break;

      case LimitType.UpperBoundInfinity:
        this.finiteIntegrand = this.upperBoundInfinityTransform;
        break;
    }
  }

  private lowerBoundInfinityTransform(value: Complex): Complex {
    const x = Complex.sub(Complex.fromReal(this.limit), Complex.div((Complex.one.sub(value)), value));
    return Complex.div(this.infinityIntegrand(x).div(value), value);
  }

  private bothBoundsInfinityTransform(value: Complex): Complex {
    const x = Complex.div(Complex.sub(Complex.one, value), value);
    const temp = Complex.add(this.infinityIntegrand(x), this.infinityIntegrand(Complex.negate(x)));
    return Complex.div(temp.div(value), value);
  }

  private upperBoundInfinityTransform(value: Complex): Complex {
    const x = Complex.add(Complex.fromReal(this.limit), Complex.div(Complex.one.sub(value), value));
    return Complex.div(this.infinityIntegrand(x).div(value), value);
  }
}


/**
 * Represents the adaptive method of numerical integration.
 */
export class ComplexAdaptiveIntegrator extends ComplexCompositeIntegrator {
  private static readonly maxRecursionDepth: number = 1000;
  private _quadr: Quadrature;


  /**
   * Gets the integration rule (quadrature formula).
   */
  public get integrationRule(): Quadrature {
    return this._quadr;
  }

  /**
   * Sets the integration rule (quadrature formula).
   */
  public set integrationRule(value: Quadrature) {
    this._quadr = value;
  }

  /**
   * Initializes a new instance of the ComplexAdaptiveIntegrator class.
   */
  constructor(quadrature: Quadrature = null) {
    super();

    this.maxIterations = 8000;
    this.tolerance = 1E-9;

    this._quadr = quadrature ? quadrature : GaussKronrodQuadratures.gaussKronrod21Rule;
  }

  /**
   * Returns the numerical value of the definite integral complex function of one variable.
   * @param integrand A complex function to integrate of one variable.
   * @param lowerBound The lower integration limit.
   * @param upperBound The upper integration limit.
   * @throws {NotConvergenceException} The algorithm does not converged for a certain number of iterations.
   */
  public integrate(integrand: Func<Complex>, lowerBound: number, upperBound: number): Complex {
    if (lowerBound === upperBound) {
      return Complex.zero;
    }

    let sign = 1;

    if (lowerBound > upperBound) {
      const temp = lowerBound;
      lowerBound = upperBound;
      upperBound = temp;
      sign = -1;
    }

    // Testing the limits to infinity
    if (Number.NEGATIVE_INFINITY === lowerBound || Number.POSITIVE_INFINITY === upperBound) {
      if (Number.NEGATIVE_INFINITY === lowerBound) {
        if (Number.POSITIVE_INFINITY === upperBound) {
          const transformation = new TransformationLimits(integrand, LimitType.BothBoundsInfinity, 0.0);
          integrand = (arg: Complex) => transformation.finiteIntegrand(arg);
        } else {
          const transformation = new TransformationLimits(integrand, LimitType.LowerBoundInfinity, upperBound);
          integrand = (arg: Complex) => transformation.finiteIntegrand(arg);
        }
      } else if (Number.POSITIVE_INFINITY === upperBound) {
        const transformation = new TransformationLimits(integrand, LimitType.UpperBoundInfinity, lowerBound);
        integrand = (arg: Complex) => transformation.finiteIntegrand(arg);
      }

      lowerBound = 0.0;
      upperBound = 1.0;
    }

    this.iterationsNeeded = 0;

    const Sab = this._quadr(integrand, lowerBound, upperBound);
    return Complex.mult(
      Complex.fromReal(sign),
      this.recursionProcedure(integrand, lowerBound, upperBound, Sab, this.tolerance, ComplexAdaptiveIntegrator.maxRecursionDepth));
  }

  private recursionProcedure(integrand: Func<Complex>, a: number, b: number, Sab: Complex, tol: number, trace: number): Complex {
    const c = (a + b) / 2;

    const Sac = this._quadr(integrand, a, c);
    const Scb = this._quadr(integrand, c, b);

    if (Complex.abs(Complex.sub(Complex.sub(Sab, Sac), Scb)) <= tol) {
      return Complex.add(Sac, Scb);
    }

    this.iterationsNeeded++;

    if (this.iterationsNeeded >= this.maxIterations || trace <= 0) {
      throw new NotConvergenceError('Calculation does not converge to a solution.');
    }

    return Complex.add(
      this.recursionProcedure(integrand, a, c, Sac, tol / 2, trace - 1),
      this.recursionProcedure(integrand, c, b, Scb, tol / 2, trace - 1)
    );
  }
}
