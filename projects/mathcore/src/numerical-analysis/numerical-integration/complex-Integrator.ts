import { Complex } from 'mathcore/complex';
import { Func } from 'mathcore/func';

/**
 * Represents the abstract base class for classes implementing algorithms of numerical integration.
 */
export abstract class ComplexIntegrator {
  /**
   * Returns the numerical value of the definite integral complex function of one variable.
   * @param integrand A complex function to integrate of one variable.
   * @param lowerBound The lower integration limit.
   * @param upperBound The upper integration limit.
   */
  public abstract integrate(integrand: Func<Complex>, lowerBound: number, upperBound: number): Complex;
}
