import { ExMath } from 'mathcore/ex-math';

/**
 * Contains methods for evaluating the error function and related functions.
 */
export class ProbabilityIntegrals {
  private static readonly Intval1 = 0.46875;
  private static readonly Intval2 = 4.0;
  private static readonly MaxArgVal = 26.5583093100796414;

  /** Coefficients for approximation to erf in first interval. */
  private static readonly erf_p: number[] = [
    3.209377589138469472562E03,
    3.774852376853020208137E02,
    1.138641541510501556495E02,
    3.161123743870565596947E00,
    1.857777061846031526730E-01
  ];

  private static readonly erf_q: number[] = [
    2.844236833439170622273E03,
    1.282616526077372275645E03,
    2.440246379344441733056E02,
    2.360129095234412093499E01,
    1.0E00
  ];

  /** Coefficients for approximation to erfc in second interval. */
  private static readonly erfc_p1: number[] = [
    1.23033935479799725272E03,
    2.05107837782607146532E03,
    1.71204761263407058314E03,
    8.81952221241769090411E02,
    2.98635138197400131132E02,
    6.61191906371416294775E01,
    8.88314979438837594118E00,
    5.64188496988670089180E-01,
    2.15311535474403846343E-08
  ];

  private static readonly erfc_q1: number[] = [
    1.23033935480374942043E03,
    3.43936767414372163696E03,
    4.36261909014324715820E03,
    3.29079923573345962678E03,
    1.62138957456669018874E03,
    5.37181101862009857509E02,
    1.17693950891312499305E02,
    1.57449261107098347253E01,
    1.0E00
  ];

  /** Coefficients for approximation to erfc in third interval. */
  private static readonly erfc_p2: number[] = [
    -6.58749161529837803157E-04,
    -1.60837851487422766278E-02,
    -1.25781726111229246204E-01,
    -3.60344899949804439429E-01,
    -3.05326634961232344035E-01,
    -1.63153871373020978498E-02
  ];

  private static readonly erfc_q2: number[] = [
    2.33520497626869185443E-03,
    6.05183413124413191178E-02,
    5.27905102951428412248E-01,
    1.87295284992346047209E00,
    2.56852019228982242072E00,
    1.0E00
  ];

  /**
   * Returns the value of error function for the specified argument.
   * @param x - A real number.
   */
  public static erf(x: number): number {
    if (Math.abs(x) > ProbabilityIntegrals.MaxArgVal) {
      return (x > 0.0) ? 1.0 : -1.0;
    }

    if (Math.abs(x) <= ProbabilityIntegrals.Intval1) {
      return x * ProbabilityIntegrals.rationalFunc(ProbabilityIntegrals.erf_p, ProbabilityIntegrals.erf_q, x * x);
    }

    return 1.0 - ProbabilityIntegrals.erfc(x);
  }

  /**
   * Returns the value of two-argument error function for the specified arguments.
   * @param x0 - The first real number.
   * @param x1 - The second real number.
   */
  public static erf2(x0: number, x1: number): number {
    return ProbabilityIntegrals.erf(x1) - ProbabilityIntegrals.erf(x0);
  }

  /**
   * Returns the value of complementary error function for the specified argument.
   * @param x - A real number.
   */
  public static erfc(x: number): number {
    const absx = Math.abs(x);

    if (absx > ProbabilityIntegrals.MaxArgVal) {
      return (x > 0.0) ? 0.0 : 2.0;
    }

    if (absx <= ProbabilityIntegrals.Intval1) {
      return 1.0 - ProbabilityIntegrals.erf(x);
    }

    if (x < 0.0) {
      return 2.0 - ProbabilityIntegrals.erfc(-x);
    }

    if (absx <= ProbabilityIntegrals.Intval2) {
      return Math.exp(-(x * x)) * ProbabilityIntegrals.rationalFunc(ProbabilityIntegrals.erfc_p1, ProbabilityIntegrals.erfc_q1, x);
    } else {
      const xsq = x * x;
      const invxsq = 1.0 / xsq;
      const R = ProbabilityIntegrals.rationalFunc(ProbabilityIntegrals.erfc_p2, ProbabilityIntegrals.erfc_q2, invxsq);
      const t = 1.0 / ExMath.sqrtPi + invxsq * R;
      return Math.exp(-xsq) / x * (t - ExMath.truncate(t));
    }
  }

  private static rationalFunc(numerator: number[], denominator: number[], value: number): number {
    let numval = 0.0;

    for (let i = numerator.length - 1; i >= 0; i--) {
      numval = numval * value + numerator[i];
    }

    let denval = 0.0;

    for (let i = denominator.length - 1; i >= 0; i--) {
      denval = denval * value + denominator[i];
    }

    return numval / denval;
  }
}
