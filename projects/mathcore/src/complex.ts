/** Represents a complex number. */
export class Complex {
  //#region Fields

  private static readonly complexRegex: RegExp = /^([-+]?[ \t]*[0-9.,]+[ij]?)([ \t]*[-+][ \t]*[0-9.,]+[ij]?)?$/;

  /** Represents the complex number zero. */
  public static readonly zero: Complex = Complex.fromRealImaginary(0, 0);

  /** Represents the imaginary unit. */
  public static readonly I: Complex = Complex.fromRealImaginary(0, 1);

  /** Represents the complex number one. */
  public static readonly one: Complex = Complex.fromRealImaginary(1, 0);

  /** Represents a complex value that is not a number (NaN). */
  public static readonly NaN: Complex = Complex.fromRealImaginary(Number.NaN, Number.NaN);

  /** Represents complex positive infinity. */
  public static readonly infinity: Complex = Complex.fromRealImaginary(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

  /** The real part of the complex number. */
  public readonly real: number;

  /** The imaginary part of the complex number. */
  public readonly imag: number;

  //#endregion

  //#region Properties

  /** Gets the modulus of the complex number. */
  public get modulus(): number {
    return Complex.abs(this);
  }

  /** Gets the argument of the complex number. */
  public get argument(): number {
    return Complex.arg(this);
  }

  /** Gets a value that indicates whether the complex number is equal to zero. */
  public get isZero(): boolean {
    return (this.real === 0.0) && (this.imag === 0.0);
  }

  /** Gets a value that indicates whether the complex number is real one. */
  public get isOne(): boolean {
    return this.real === 1.0 && this.imag === 0.0;
  }

  /** Gets a value that indicates whether the imaginary part is equal to zero. */
  public get isReal(): boolean {
    return this.imag === 0;
  }

  /** Gets a value that indicates whether the real part is equal to zero. */
  public get isImaginary(): boolean {
    return this.real === 0;
  }

  //#endregion

  //#region Constructors

  /**
   * Initializes a complex number.
   * @param {number} real - The real part of the complex number.
   * @param {number} imaginary - The imaginary part of the complex number.
   */
  constructor(real: number, imaginary: number = 0.0) {
    this.real = real;
    this.imag = imaginary;
  }

  //#endregion

  //#region Methods

  //#region Statics

  /**
   * Creates a complex number from the real number.
   * @param {number} real - The real part of the complex number.
   */
  public static fromReal(real: number): Complex {
    return new Complex(real, 0.0);
  }

  /**
   * Creates a complex number from real and imaginary coords.
   * @param real - The real part of the complex number.
   * @param imaginary - The imaginary part of the complex number.
   */
  public static fromRealImaginary(real: number, imaginary: number): Complex {
    return new Complex(real, imaginary);
  }

  /**
   * Creates a complex number from polar coordinates.
   * @param modulus - The modulus of complex number.
   * @param argument - The argument of complex number.
   */
  public static fromPolarCoordinates(modulus: number, argument: number): Complex {
    return new Complex(
      modulus * Math.cos(argument),
      modulus * Math.sin(argument)
    );
  }

  /**
   * Returns the absolute value of a complex number.
   * @param c - A complex number.
   */
  public static abs(c: Complex): number {
    if (!Number.isFinite(c.real) || !Number.isFinite(c.imag)) {
      return Number.POSITIVE_INFINITY;
    }

    const real = Math.abs(c.real);
    const imag = Math.abs(c.imag);

    if (real > imag) {
      const temp1 = imag / real;
      return (real * Math.sqrt(1.0 + (temp1 * temp1)));
    }

    if (imag === 0.0) {
      return real;
    }

    const temp2 = real / imag;
    return (imag * Math.sqrt(1.0 + (temp2 * temp2)));
  }

  /**
   * Returns the absolute value squared of a complex number.
   * @param c - A complex number.
   */
  public static absSquared(c: Complex): number {
    return c.real * c.real + c.imag * c.imag;
  }

  /**
   * Returns the argument of a complex number.
   * @param c - A complex number.
   */
  public static arg(c: Complex): number {
    return c.isZero ? Number.NaN : Math.atan2(c.imag, c.real);
  }

  /**
   * Returns the inverse value of a complex number.
   * @param c - A complex number.
   */
  public static inverse(c: Complex): Complex {
    const real = c.real / (c.real * c.real + c.imag * c.imag);
    const imag = -c.imag / (c.real * c.real + c.imag * c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the result of multiplying a complex number by negative one.
   * @param c - A complex number.
   * @returns The complex number with the value of c, but the opposite sign.
   */
  public static negate(c: Complex): Complex {
    const real = (c.real !== 0.0) ? -c.real : 0.0;
    const imag = (c.imag !== 0.0) ? -c.imag : 0.0;

    return new Complex(real, imag);
  }

  /**
   * Returns conjugate the complex number.
   * @param c - A complex number.
   */
  public static conj(c: Complex): Complex {
    return new Complex(c.real, (c.imag !== 0.0) ? -c.imag : 0.0);
  }

  /**
   * Returns the sign of a complex number.
   * @param c - A complex number.
   */
  public static sign(c: Complex): number {
    if (c.isZero) {
      return 0;
    } else if (c.real > 0.0 || (c.real === 0.0 && c.imag > 0.0)) {
      return 1;
    } else {
      return -1;
    }
  }

  /**
   * Returns the smaller of two complex numbers.
   * @param c1 - The first complex number to compare.
   * @param c2 - The second complex number to compare.
   */
  public static min(c1: Complex, c2: Complex): Complex {
    return new Complex(Math.min(c1.real, c2.real), Math.min(c1.imag, c2.imag));
  }

  /**
   * Returns the larger of two complex numbers.
   * @param c1 - The first complex number to compare.
   * @param c2 - The second complex number to compare.
   */
  public static max(c1: Complex, c2: Complex): Complex {
    return new Complex(Math.max(c1.real, c2.real), Math.max(c1.imag, c2.imag));
  }

  /**
   * Adds two complex numbers.
   * @param c1 - A complex number (the first term).
   * @param c2 - A complex number (the second term).
   * @returns The sum of complex numbers.
   */
  public static add(c1: Complex, c2: Complex): Complex {
    return new Complex(c1.real + c2.real, c1.imag + c2.imag);
  }

  /**
   * Adds a complex number and real.
   * @param c - A complex number (the first term).
   * @param n - A real number (the second term).
   * @returns The sum of complex number and real.
   */
  public static addNumber(c: Complex, n: number): Complex {
    return new Complex(c.real + n, c.imag);
  }

  /**
   * Subtracts one a complex number from another.
   * @param c1 - A complex number (the minuend).
   * @param c2 - A complex number (the subtrahend).
   * @returns The result of subtracting c2 from c1.
   */
  public static sub(c1: Complex, c2: Complex): Complex {
    return new Complex(c1.real - c2.real, c1.imag - c2.imag);
  }

  /**
   * Subtracts one a real number from a complex number.
   * @param c1 - A complex number (the minuend).
   * @param c2 - A real number (the subtrahend).
   * @returns The result of subtracting n from c.
   */
  public static subNumber(c: Complex, n: number): Complex {
    return new Complex(c.real - n, c.imag);
  }

  /**
   * Multiplies two complex numbers.
   * @param c1 - A complex number (the multiplicand).
   * @param c2 - A complex number (the multiplier).
   * @returns The product of c1 and c2.
   */
  public static mult(c1: Complex, c2: Complex): Complex {
    const real = c1.real * c2.real - c1.imag * c2.imag;
    const imag = c1.real * c2.imag + c1.imag * c2.real;

    return new Complex(real, imag);
  }

  /**
   * Multiplies one the conjugate of a complex number and another.
   * @param c1 - A complex number (the multiplicand).
   * @param c2 - A complex number (the multiplier).
   * @returns The product of conjugate of c1 and c2.
   */
  public static conjMult(c1: Complex, c2: Complex): Complex {
    const real = c1.real * c2.real + c1.imag * c2.imag;
    const imag = c1.real * c2.imag - c1.imag * c2.real;

    return new Complex(real, imag);
  }

  /**
   * Divides two complex numbers.
   * @param c1 - A complex number (the dividend).
   * @param c2 - A complex number (the divisor).
   * @returns The result of dividing c1 by c2.
   */
  public static div(c1: Complex, c2: Complex): Complex {
    const ar = c1.real, ai = c1.imag;
    const br = c2.real, bi = c2.imag;
    let real = 0, imag = 0;

    if (Math.abs(bi) < Math.abs(br)) {
      const denom = br + (bi * (bi / br));

      real = (ar + (ai * (bi / br))) / denom;
      imag = (ai - (ar * (bi / br))) / denom;
    } else {
      const denom = bi + (br * (br / bi));

      real = (ai + (ar * (br / bi))) / denom;
      imag = (-ar + (ai * (br / bi))) / denom;
    }

    return new Complex(real, imag);
  }

  /**
   * Returns the square root of a real or complex number.
   * @param c - A complex or real number.
   */
  public static sqrt(n: number | Complex): Complex {
    if (typeof n === 'number') {
      if (n >= 0.0) {
        return Complex.fromReal(Math.sqrt(n));
      } else {
        return Complex.fromRealImaginary(0, Math.sqrt(-n));
      }
    }

    const zr = n.real;
    const zi = n.imag;
    const mag = Complex.abs(n);

    let real = 0, imag = 0;

    if (mag === 0.0) {
      real = imag = 0.0;
    } else if (zr > 0) {
      real = Math.sqrt(0.5 * (mag + zr));
      imag = zi / real / 2;
    } else {
      imag = Math.sqrt(0.5 * (mag - zr));

      if (zi < 0) {
        imag = -imag;
      }

      real = zi / imag / 2;
    }

    return new Complex(real, imag);
  }

  /**
   * Returns a complex number raised to an integer power.
   * @param c - A complex number to be raised to a power.
   * @param exponent An integer number that specifies a power.
   * @throws {Error} - exponent is not an integer.
   */
  public static powInt(c: Complex, exponent: number): Complex {
    if (!Number.isInteger(exponent)) {
      throw new Error('exponent must be an integer number.');
    }

    let temp = c;

    if (exponent === 0) {
      return Complex.one;
    }

    if (exponent < 0) {
      exponent = -exponent;
      temp = Complex.inverse(temp);
    }

    let result = Complex.one;

    while (exponent !== 0) {
      // tslint:disable-next-line:no-bitwise
      if ((exponent & 1) !== 0) {
        result = Complex.mult(result, temp);
      }

      temp = temp.sqr();
      // tslint:disable-next-line:no-bitwise
      exponent >>= 1;
    }

    return result;
  }

  /**
   * Returns a complex number raised to a real or complex power.
   * @param c - A complex number to be raised to a power.
   * @param exponent - A complex or real number that specifies a power.
   */
  public static pow(c: Complex, exponent: number | Complex): Complex {
    if (typeof exponent === 'number') {
      if (Number.isInteger(exponent)) {
        return Complex.powInt(c, exponent);
      }

      const rn = Math.pow(Complex.abs(c), exponent);
      const arg = Math.atan2(c.imag, c.real);

      const real = rn * Math.cos(arg * exponent);
      const imag = rn * Math.sin(arg * exponent);

      return new Complex(real, imag);
    }

    if (exponent.isReal) {
      return Complex.pow(c, exponent.real);
    } else {
      return Complex.exp(exponent.mult(Complex.log(c)));
    }
  }

  /**
   * Returns the sine of a complex number.
   * @param c - A complex number.
   */
  public static sin(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.sin(c.real));
    }

    const real = Math.sin(c.real) * Math.cosh(c.imag);
    const imag = Math.cos(c.real) * Math.sinh(c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the cosine of a complex number.
   * @param c - A complex number.
   */
  public static cos(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.cos(c.real));
    }

    const real = Math.cos(c.real) * Math.cosh(c.imag);
    const imag = -Math.sin(c.real) * Math.sinh(c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the tangent of a complex number.
   * @param c - A complex number.
   */
  public static tan(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.tan(c.real));
    }

    return Complex.div(Complex.sin(c), Complex.cos(c));
  }

  /**
   * Returns the cotangent of a complex number.
   * @param c - A complex number.
   */
  public static cot(c: Complex): Complex {
    return Complex.div(Complex.cos(c), Complex.sin(c));
  }

  /**
   * Returns the secant of a complex number.
   * @param c - A complex number.
   */
  public static sec(c: Complex): Complex {
    return Complex.div(
      Complex.fromReal(2.0),
      Complex.add(Complex.exp(Complex.I.mult(c)), Complex.exp(Complex.negate(Complex.I).mult(c)))
    );
  }

  /**
   * Returns the cosecant of a complex number.
   * @param c - A complex number.
   */
  public static csc(c: Complex): Complex {
    return Complex.div(
      Complex.fromReal(2.0).mult(Complex.I),
      Complex.sub(Complex.exp(Complex.I.mult(c)), Complex.exp(Complex.negate(Complex.I).mult(c)))
    );
  }

  /**
   * Returns the inverse sine of a complex number.
   * @param c - A complex number.
   */
  public static asin(c: Complex): Complex {
    if (c.isReal && Math.abs(c.real) <= 1.0) {
      return Complex.fromReal(Math.asin(c.real));
    }

    return Complex.mult(
      Complex.negate(Complex.I),
      Complex.log(Complex.add(Complex.I.mult(c), Complex.sqrt(Complex.one.sub(c.sqr()))))
    );
  }

  /**
   * Returns the inverse cosine of a complex number.
   * @param c - A complex number.
   */
  public static acos(c: Complex): Complex {
    if (c.isReal && Math.abs(c.real) <= 1.0) {
      return Complex.fromReal(Math.acos(c.real));
    }

    return Complex.mult(
      Complex.negate(Complex.I),
      Complex.log(Complex.add(c, Complex.I.mult(Complex.sqrt(Complex.one.sub(c.sqr())))))
    );
  }

  /**
   * Returns the inverse tangent of a complex number.
   * @param c - A complex number.
   */
  public static atan(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.atan(c.real));
    }

    return Complex.mult(
      Complex.I.div(Complex.fromReal(2.0)),
      Complex.log(Complex.div(Complex.I.add(c), Complex.I.sub(c)))
    );
  }

  /**
   * Returns the inverse cotangent of a complex number.
   * @param c - A complex number.
   */
  public static acot(c: Complex): Complex {
    return Complex.mult(
      Complex.I.div(Complex.fromReal(2.0)),
      Complex.sub(Complex.log(c.sub(Complex.I).div(c)), Complex.log(c.add(Complex.I).div(c)))
    );
  }

  /**
   * Returns the inverse secant of a complex number.
   * @param c - A complex number.
   */
  public static asec(c: Complex): Complex {
    return Complex.acos(Complex.inverse(c));
  }

  /**
   * Returns the inverse cosecant of a complex number.
   * @param c - A complex number.
   */
  public static acsc(c: Complex): Complex {
    return Complex.asin(Complex.inverse(c));
  }

  /**
   * Returns the versine of a complex number.
   * @param c - A complex number.
   */
  public static vers(c: Complex): Complex {
    return Complex.sub(Complex.one, Complex.cos(c));
  }

  /**
   * Returns the coversine of a complex number.
   * @param c - A complex number.
   */
  public static cvs(c: Complex): Complex {
    return Complex.sub(Complex.one, Complex.sin(c));
  }

  /**
   * Returns the haversine of a complex number.
   * @param c - A complex number.
   */
  public static hav(c: Complex): Complex {
    return Complex.sub(Complex.one, Complex.cos(c)).div(Complex.fromReal(2.0));
  }

  /**
   * Returns the exsecant of a complex number.
   * @param c - A complex number.
   */
  public static exsec(c: Complex): Complex {
    return Complex.sub(Complex.sec(c), Complex.one);
  }

  /**
   * Returns the excosecant of a complex number.
   * @param c - A complex number.
   */
  public static excsc(c: Complex): Complex {
    return Complex.sub(Complex.csc(c), Complex.one);
  }

  /**
   * Returns the inverse haversine of a complex number.
   * @param c - A complex number.
   */
  public static ahav(c: Complex): Complex {
    return Complex.mult(Complex.fromReal(2.0), Complex.asin(Complex.sqrt(c)));
  }

  /**
   * Returns the sine cardinal of a complex number.
   * @param c - A complex number.
   */
  public static sinc(c: Complex): Complex {
    if (c.isZero) {
      return Complex.one;
    } else {
      return Complex.div(Complex.sin(c), c);
    }
  }

  /**
   * Returns the tangent cardinal of a complex number.
   * @param c - A complex number.
   */
  public static tanc(c: Complex): Complex {
    if (c.isZero) {
      return Complex.one;
    } else {
      return Complex.div(Complex.tan(c), c);
    }
  }

  /**
   * Returns the hyperbolic sine of a complex number.
   * @param c - A complex number.
   */
  public static sinh(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.sinh(c.real));
    }

    const real = Math.sinh(c.real) * Math.cos(c.imag);
    const imag = Math.cosh(c.real) * Math.sin(c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the hyperbolic cosine of a complex number.
   * @param c - A complex number.
   */
  public static cosh(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.cosh(c.real));
    }

    const real = Math.cosh(c.real) * Math.cos(c.imag);
    const imag = Math.sinh(c.real) * Math.sin(c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the hyperbolic tangent of a complex number.
   * @param c - A complex number.
   */
  public static tanh(c: Complex): Complex {
    if (c.isReal) {
      return Complex.fromReal(Math.tanh(c.real));
    }

    const exp = Complex.exp(Complex.mult(Complex.fromReal(2.0), c));
    return Complex.div(exp.sub(Complex.one), exp.add(Complex.one));
  }

  /**
   * Returns the hyperbolic cotangent of a complex number.
   * @param c - A complex number.
   */
  public static coth(c: Complex): Complex {
    const exp = Complex.exp(Complex.mult(Complex.fromReal(2.0), c));
    return Complex.div(exp.add(Complex.one), exp.sub(Complex.one));
  }

  /**
   * Returns the hyperbolic secant of a complex number.
   * @param c - A complex number.
   */
  public static sech(c: Complex): Complex {
    return Complex.inverse(Complex.cosh(c));
  }

  /**
   * Returns the hyperbolic cosecant of a complex number.
   * @param c - A complex number.
   */
  public static csch(c: Complex): Complex {
    return Complex.inverse(Complex.sinh(c));
  }

  /**
   * Returns the inverse hyperbolic sine of a complex number.
   * @param c - A complex number.
   */
  public static asinh(c: Complex): Complex {
    return Complex.log(c.add(Complex.sqrt(Complex.one.add(c.sqr()))));
  }

  /**
   * Returns the inverse hyperbolic cosine of a complex number.
   * @param c - A complex number.
   */
  public static acosh(c: Complex): Complex {
    return Complex.log(Complex.add(c, Complex.mult(Complex.sqrt(c.add(Complex.one)), Complex.sqrt(c.sub(Complex.one)))));
  }

  /**
   * Returns the inverse hyperbolic tangent of a complex number.
   * @param c - A complex number.
   */
  public static atanh(c: Complex): Complex {
    return Complex.div(
      Complex.sub(Complex.log(Complex.one.add(c)), Complex.log(Complex.one.sub(c))),
      Complex.fromReal(2.0)
    );
  }

  /**
   * Returns the inverse hyperbolic cotangent of a complex number.
   * @param c - A complex number.
   */
  public static acoth(c: Complex): Complex {
    const invc = Complex.inverse(c);
    return Complex.div(
      Complex.sub(Complex.log(Complex.one.add(invc)), Complex.log(Complex.one.sub(invc))),
      Complex.fromReal(2.0)
    );
  }

  /**
   * Returns the inverse hyperbolic secant of a complex number.
   * @param c - A complex number.
   */
  public static asech(c: Complex): Complex {
    const invc = Complex.inverse(c);
    return Complex.log(Complex.add(Complex.mult(Complex.sqrt(invc.sub(Complex.one)), Complex.sqrt(invc.add(Complex.one))), invc));
  }

  /**
   * Returns the inverse hyperbolic cosecant of a complex number.
   * @param c - A complex number.
   */
  public static acsch(c: Complex): Complex {
    return Complex.log(Complex.add(Complex.sqrt(Complex.one.add(Complex.inverse(c.sqr()))), Complex.inverse(c)));
  }

  /**
   * Returns the hyperbolic sine cardinal of a complex number.
   * @param c - A complex number.
   */
  public static sinhc(c: Complex): Complex {
    if (c.isZero) {
      return Complex.one;
    } else {
      return Complex.div(Complex.sinh(c), c);
    }
  }

  /**
   * Returns the hyperbolic tangent cardinal of a complex number.
   * @param c - A complex number.
   */
  public static tanhc(c: Complex): Complex {
    if (c.isZero) {
      return Complex.one;
    } else {
      return Complex.div(Complex.tanh(c), c);
    }
  }

  /**
   * Returns e raised to a complex power.
   * @param c - A complex number that specifies a power.
   */
  public static exp(c: Complex): Complex {
    const real = Math.exp(c.real) * Math.cos(c.imag);
    const imag = Math.exp(c.real) * Math.sin(c.imag);

    return new Complex(real, imag);
  }

  /**
   * Returns the logarithm of a complex number in a specified base.
   * @param c - A complex number.
   * @param newBase - The base of the logarithm (optional).
   * @throws {RangeError} - newBase is negative.
   */
  public static log(c: Complex, newBase?: number): Complex {
    if (newBase === undefined) {
      const real = Math.log(Complex.abs(c));
      const imag = Math.atan2(c.imag, c.real);

      return new Complex(real, imag);
    }

    if (newBase < 0) {
      throw new RangeError('The base must be positive value.');
    }

    return Complex.div(Complex.log(c), Complex.fromReal(Math.log(newBase)));
  }

  /**
   * Returns the base 10 logarithm of a complex number.
   * @param c - A complex number.
   */
  public static log10(c: Complex): Complex {
    return Complex.div(Complex.log(c), Complex.fromReal(Math.log(10)));
  }

  /**
   * Returns the largest complex integer less than or equal to the specified complex number.
   * @param c - A complex number.
   * @returns The largest complex integer less than or equal to c.
   */
  public static floor(c: Complex): Complex {
    return new Complex(Math.floor(c.real), Math.floor(c.imag));
  }

  /**
   * Returns the smallest complex integer greater than or equal to the specified complex number.
   * @param c - A complex number.
   * @returns The smallest complex integer greater than or equal to c.
   */
  public static ceil(c: Complex): Complex {
    return new Complex(Math.ceil(c.real), Math.ceil(c.imag));
  }

  /**
   * Returns the integer part of a complex number.
   * @param c - A complex number.
   */
  public static intPart(c: Complex): Complex {
    return Complex.floor(c);
  }

  /**
   * Returns the fractional part of a complex number.
   * @param c - A complex number.
   */
  public static fracPart(c: Complex): Complex {
    return Complex.sub(c, Complex.floor(c));
  }

  /**
   * Rounds a complex value to a specified complex number of fractional digits.
   * @param c - A complex number to be rounded.
   * @param digits - The number of fractional digits in the return value.
   * @returns The complex number nearest to value that contains a number of fractional digits equal to digits.
   */
  public static round(c: Complex, digits?: number): Complex {
    if (digits === undefined) {
      return new Complex(Math.round(c.real), Math.round(c.imag));
    }

    const real = +(c.real.toFixed(digits));
    const imag = +(c.imag.toFixed(digits));

    return new Complex(real, imag);
  }

  /**
   * Returns the integral part of a specified complex number.
   * @param c - A complex number to truncate.
   * @returns The integral part of c; that is, the number that remains after any fractional digits have been discarded.
   */
  public static trun(c: Complex): Complex {
    const trun = (d: number) => (d > 0) ? Math.floor(d) : Math.ceil(d);
    return new Complex(trun(c.real), trun(c.imag));
  }

  /**
   * Returns a value that indicates whether the complex number evaluates to an infinity value.
   * @param c - A complex number.
   * @returns true if the real or imaginary part evaluates to positive or negative infinity;
   */
  public static isInfinity(c: Complex): boolean {
    return !Number.isFinite(c.real) || !Number.isFinite(c.imag);
  }

  /**
   * Returns a value that indicates whether the complex number evaluates to a value that is not a number.
   * @param c - A complex number.
   * @returns  true if the real or imaginary part evaluates to Number.NaN; otherwise false.
   */
  public static isNaN(c: Complex): boolean {
    return Number.isNaN(c.real) || Number.isNaN(c.imag);
  }

  /**
   * Converts string representation of a number to its complex number equivalent.
   * @param s - A string containing a complex number to convert.
   * @throws {SyntaxError} - s is not a number in a valid format.
   */
  public static parse(s: string): Complex {
    const str = (s + '').trim();
    const match = Complex.complexRegex.exec(str);

    if (match === null) {
      throw new SyntaxError('Invalid format of the complex number.');
    }

    let result = Complex.zero;

    match.shift();
    match
      .filter(x => x !== undefined)
      .forEach(x => {
      const term = x.replace(/[ \t]/g, '');

      if (term.endsWith('i') || term.endsWith('j')) {
        result = Complex.add(result, Complex.fromRealImaginary(0, Number.parseFloat(term.substr(0, term.length - 1))));
      } else {
        result = Complex.add(result, Complex.fromReal(Number.parseFloat(term)));
      }
    });

    return result;
  }

  /**
   * Converts an object to a complex number instance.
   * @param obj - The object which represents an complex number.
   */
  public static fromJson(obj: Object): Complex {
    return new Complex(obj['real'], obj['imag']);
  }

  /**
   * Returns a value indicating whether two instances of complex number are equal.
   * @param c1 - The first complex number to compare.
   * @param c2 - The second complex number to compare.
   */
  public static equals(c1: Complex, c2: Complex): boolean {
    return (c1.real === c2.real && c1.imag === c2.imag);
  }

  //#endregion

  //#region Dynamics

  /**
   * Adds a complex number to existing one.
   * @param c - A complex number.
   */
  public add(c: Complex): Complex {
    return Complex.add(this, c);
  }

  /**
   * Subtracts a complex number from the existing one.
   * @param c - A complex number.
   */
  public sub(c: Complex): Complex {
    return Complex.sub(this, c);
  }

  /**
   * Multiplies the existing complex number into another one.
   * @param c - A complex number.
   */
  public mult(c: Complex): Complex {
    return Complex.mult(this, c);
  }

  /**
   * Divides the existing complex number into another one.
   * @param c - A complex number.
   */
  public div(c: Complex): Complex {
    return Complex.div(this, c);
  }

  /**
   * Returns a square value of complex number.
   */
  public sqr(): Complex {
    return Complex.mult(this, this);
  }

  /**
   * Returns a value indicating whether this instance is equal to a specified complex number.
   * @param obj - A Complex object to compare to this instance.
   */
  public equals(obj: Complex): boolean {
    return Complex.equals(this, obj);
  }

  /**
   * Converts the complex value of this instance to its equivalent string representation.
   */
  public toString(): string {
    return this.toCustomFormatString((n: number) => n.toString());
  }

  /**
   * Converts the complex value of this instance to its equivalent string representation using a custom formatter.
   * @param format - A function to format real and imaginary part of the complex number.
   */
  public toCustomFormatString(format: (n: number) => string): string {
    const realStr: string = format(this.real);
    const imagStr: string = format(Math.abs(this.imag));

    if (this.isZero) {
      return '0';
    }

    if (this.isReal) {
      return realStr;
    } else if (this.isImaginary && this.imag < 0) {
      return `-${imagStr}i`;
    } else if (this.isImaginary && this.imag >= 0) {
      return `${imagStr}i`;
    } else if (this.imag < 0) {
      return `${realStr} - ${imagStr}i`;
    } else {
      return `${realStr} + ${imagStr}i`;
    }
  }

  //#endregion
}
