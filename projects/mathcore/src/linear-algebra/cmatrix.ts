import { Complex } from 'mathcore/complex';
import { MatrixSizeMismatchError } from './matrix-size-mismatch-error';
import { DivideByZeroError } from 'mathcore/errors/divide-by-zero-error';

/** Represents a general complex matrix. */
export class CMatrix {
  /** Provides data for the complex matrix. */
  private readonly arr: Complex[][];

  /**
   * Initializes a complex matrix.
   * @param rows - The number of rows.
   * @param columns - The number of columns.
   */
  constructor(public readonly rows: number, public readonly columns: number) {
    this.arr = [];
    this.arr.length = rows;

    for (let i = 0; i < rows; i++) {
      this.arr[i] = [];
      this.arr[i].length = columns;

      for (let j = 0; j < columns; j++) {
        this.arr[i][j] = Complex.zero;
      }
    }
  }

  /** Gets a value that indicates whether the matrix is column vector. */
  public get isVector(): boolean {
    return this.columns === 1 && this.rows >= 1;
  }

  /**
   * Gets a value that indicates whether the matrix is square
   * (the matrix with the same number of rows and columns).
   */
  public get isSquare(): boolean {
    return this.rows === this.columns;
  }

  /**
   * Gets a value that indicates whether the matrix is real
   * (the matrix consisting only of real entries).
   */
  public get isReal(): boolean {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.arr[i][j].isReal) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Returns the identity matrix of the specified size.
   * @param n - A number of rows and columns.
   * @returns n by n identity matrix.
   */
  public static identity(n: number): CMatrix {
    const m = new CMatrix(n, n);

    for (let i = 0; i < n; i++) {
      m.arr[i][i] = Complex.one;
    }

    return m;
  }

  /**
   * Adds two complex matrices or adds of complex matrix and scalar.
   * @param m1 - A complex matrix (the first term).
   * @param m2 - A complex matrix or complex number (the second term).
   * @throws {MatrixSizeMismatchError} The matrix sizes of m1 and m2 do not match.
   */
  public static add(m1: CMatrix, m2: CMatrix | Complex): CMatrix {
    if (m2 instanceof Complex) {
      return m1.applyFunction(c => Complex.add(c, m2));
    }

    if (m1.rows !== m2.rows || m1.columns !== m2.columns) {
      throw new MatrixSizeMismatchError('Matrix sizes do not match.');
    }

    const m3 = new CMatrix(m1.rows, m1.columns);

    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.columns; j++) {
        m3.arr[i][j] = Complex.add(m1.arr[i][j], m2.arr[i][j]);
      }
    }

    return m3;
  }

  /**
   * Subtracts one complex matrix from another or from/to complex number.
   * @param m1 - A complex matrix or complex number (the minuend).
   * @param m2 - A complex matrix or complex number (the subtrahend).
   * @throws {MatrixSizeMismatchError} The matrix sizes of m1 and m2 do not match.
   */
  public static sub(m1: Complex | CMatrix, m2: Complex | CMatrix): CMatrix | Complex {
    if (m1 instanceof Complex) {
      if (m2 instanceof Complex) {
        return Complex.sub(m1, m2);
      }
      return m2.applyFunction(c => Complex.sub(m1, c));
    }

    if (m2 instanceof Complex) {
      return m1.applyFunction(c => Complex.sub(c, m2));
    }

    if (m1.rows !== m2.rows || m1.columns !== m2.columns) {
      throw new MatrixSizeMismatchError('Matrix sizes do not match.');
    }

    const m3 = new CMatrix(m1.rows, m1.columns);

    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.columns; j++) {
        m3.arr[i][j] = Complex.sub(m1.arr[i][j], m2.arr[i][j]);
      }
    }

    return m3;
  }

  /**
   * Multiplies two complex matrices or multiplies a complex matrix by a scalar.
   * @param m1 - A complex matrix (the multiplicand).
   * @param m2 - A complex matrix or complex number (the multiplier).
   * @throws {MatrixSizeMismatchError} The number of columns of the matrix m1 is not equal to the number of rows of the matrix m2.
   */
  public static mult(m1: CMatrix, m2: CMatrix | Complex): CMatrix {
    if (m2 instanceof Complex) {
      return m1.applyFunction(c => Complex.mult(c, m2));
    }

    if (m1.columns !== m2.rows) {
      throw new MatrixSizeMismatchError(
        'The number of columns of the first matrix must equal the number of rows of the second matrix.');
    }

    const m3 = new CMatrix(m1.rows, m2.columns);

    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m2.columns; j++) {
        for (let k = 0; k < m1.columns; k++) {
          m3.arr[i][j] = Complex.add(m3.arr[i][j], Complex.mult(m1.arr[i][k], m2.arr[k][j]));
        }
      }
    }

    return m3;
  }

  /**
   * Divides two complex matrices or complex numbers.
   * @param m1 - A complex matrix or complex number (the dividend).
   * @param m2 - A complex matrix or complex number (the divisor).
   * @throws {MatrixSizeMismatchError} The matrix m2 is not square or the number of columns of the matrix m1
   * is not equal to the number of rows of the matrix m2.
   * @throws {DivideByZeroError} The matrix m2 is singular.
   */
  public static div(m1: Complex | CMatrix, m2: Complex | CMatrix): CMatrix | Complex {
    if (m1 instanceof Complex) {
      if (m2 instanceof Complex) {
        return Complex.div(m1, m2);
      }

      if (m2.isSquare) {
        return CMatrix.mult(CMatrix.inverse(m2), m1);
      } else {
        return m2.applyFunction(c => Complex.div(m1, c));
      }
    }

    if (m2 instanceof Complex) {
      return m1.applyFunction(c => Complex.div(c, m2));
    }

    return CMatrix.mult(m1, CMatrix.inverse(m2));
  }

  /**
   * Returns a column vector raised to complex power.
   * @param v - A column vector.
   * @param degree - A complex or real number that specifies a power.
   * @throws {MatrixSizeMismatchError} The matrix v is not a column vector.
   */
  public static pow(v: CMatrix, degree: number | Complex): CMatrix {
    if (!v.isVector) {
      throw new MatrixSizeMismatchError('The matrix must be column vector.');
    }

    const result = new CMatrix(v.rows, v.columns);

    for (let i = 0; i < v.rows; i++) {
      result.arr[i][0] = Complex.pow(v.arr[i][0], degree);
    }

    return result;
  }

  /**
   * Returns a complex square matrix or column vector raised to an integer power.
   * @param m - A complex square matrix or column vector.
   * @param degree - An integer number that specifies a power.
   * @throws {MatrixSizeMismatchError} The matrix m is not square or not column vector.
   */
  public static powInt(m: CMatrix, degree: number): CMatrix {
    if (m.isSquare) {
      if (degree === 0) {
        return CMatrix.identity(m.rows);
      }

      if (degree < 0) {
        degree = -degree;
        m = CMatrix.inverse(m);
      }

      let result = CMatrix.identity(m.rows);

      while (degree !== 0) {
        // tslint:disable-next-line:no-bitwise
        if ((degree & 1) !== 0) {
          result = CMatrix.mult(result, m);
        }

        m = CMatrix.mult(m, m);
        // tslint:disable-next-line:no-bitwise
        degree >>= 1;
      }

      return result;
    } else if (m.isVector) {
      const result = new CMatrix(m.rows, 1);

      for (let i = 0; i < m.rows; i++) {
        result.arr[i][0] = Complex.pow(m.arr[i][0], degree);
      }

      return result;
    } else {
      throw new MatrixSizeMismatchError('The matrix must be square or column vector.');
    }
  }

  /**
   * Returns the inverse matrix for a regular matrix.
   * @param m - A complex square matrix.
   * @throws {MatrixSizeMismatchError} The matrix m is not square.
   * @throws {DivideByZeroError} The matrix m is singular.
   */
  public static inverse(m: CMatrix): CMatrix {
    if (!m.isSquare) {
      throw new MatrixSizeMismatchError('Cannot invert non-square matrix.');
    }

    const n = m.columns;
    const LUP = CMatrix.lupDecomposition(m);
    const P = LUP[0];
    const C = new CMatrix(n, n);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i > j) {
          C.arr[i][j] = LUP[1].arr[i][j];
        } else {
          C.arr[i][j] = LUP[2].arr[i][j];
        }
      }
    }

    const X = new CMatrix(n, n);

    for (let k = n - 1; k >= 0; k--) {
      X.arr[k][k] = Complex.one;

      for (let j = n - 1; j > k; j--) {
        X.arr[k][k] = Complex.sub(X.arr[k][k], Complex.mult(C.arr[k][j], X.arr[j][k]));
      }

      X.arr[k][k] = Complex.div(X.arr[k][k], C.arr[k][k]);

      for (let i = k - 1; i >= 0; i--) {
          for (let j = n - 1; j > i; j--) {
            X.arr[i][k] = Complex.sub(X.arr[i][k], Complex.mult(C.arr[i][j], X.arr[j][k]));
            X.arr[k][i] = Complex.sub(X.arr[k][i], Complex.mult(C.arr[j][i], X.arr[k][j]));
          }

          X.arr[i][k] = Complex.div(X.arr[i][k], C.arr[i][i]);
      }
    }

    return CMatrix.mult(X, P);
  }

  /**
   * Returns the solution of the linear system.
   * @param a - A complex square matrix.
   * @param b - A complex column vector.
   * @returns The column vector which is a solution of the equation a * x = b.
   * @throws {MatrixSizeMismatchError} The matrix a is not square or the matrix b is not column vector
   * or the length of column vector b is not equal to the size of matrix a.
   * @throws {DivideByZeroError} The matrix a is singular.
   */
  public static solve(a: CMatrix, b: CMatrix): CMatrix {
    if (!a.isSquare) {
      throw new MatrixSizeMismatchError('Cannot uniquely solve non-square equation system.');
    }

    const LUP = CMatrix.lupDecomposition(a);
    const n = b.rows;

    // Solve Ly = Pb for y using forward substitution.
    const L = LUP[1];
    const y = CMatrix.mult(LUP[0], b);

    for (let j = 0; j < n - 1; j++) {
      y.arr[j][0] = Complex.div(y.arr[j][0], L.arr[j][j]);

      for (let i = 1; i < n - j; i++) {
        y.arr[j + i][0] = Complex.sub(y.arr[j + i][0], Complex.mult(y.arr[j][0], L.arr[j + i][j]));
      }
    }

    y.arr[n - 1][0] = Complex.div(y.arr[n - 1][0], L.arr[n - 1][n - 1]);

    // Solve Ux = y for x using back substitution.
    const U = LUP[2];
    const x = y.clone();

    for (let j = n - 1; j > 0; j--) {
      x.arr[j][0] = Complex.div(x.arr[j][0], U.arr[j][j]);

      for (let i = 0; i <= j - 1; i++) {
        x.arr[i][0] = Complex.sub(x.arr[i][0], Complex.mult(x.arr[j][0], U.arr[i][j]));
      }
    }

    x.arr[0][0] = Complex.div(x.arr[0][0], U.arr[0][0]);

    return x;
  }

  /**
   * Returns LU-decomposition with column pivoting for the complex square matrix.
   * @param m - A complex square matrix.
   * @returns The permutation matrix P, the lower and upper triangular matrices L, U.
   * @throws {MatrixSizeMismatchError} The matrix m is not square.
   * @throws {DivideByZeroError} The matrix m is singular.
   */
  public static lupDecomposition(m: CMatrix): CMatrix[] {
    if (!m.isSquare) {
      throw new MatrixSizeMismatchError('Cannot perform LUP-decomposition of non-square matrix.');
    }

    const n = m.rows;

    const c: CMatrix = m.clone();
    const p: CMatrix = CMatrix.identity(n);

    for (let i = 0; i < n; i++) {
      // Search pivot
      let pivotValue = 0;
      let pivot = -1;
      for (let row = i; row < n; row++) {
        if (Complex.abs(c.arr[row][i]) > pivotValue) {
          pivotValue = Complex.abs(c.arr[row][i]);
          pivot = row;
        }
      }

      if (pivotValue === 0) {
        throw new DivideByZeroError('The matrix is singular.');
      }

      // 	Swap the i-th row
      p.swapRows(pivot, i);
      c.swapRows(pivot, i);

      for (let j = i + 1; j < n; j++) {
        c.arr[j][i] = Complex.div(c.arr[j][i], c.arr[i][i]);

        for (let k = i + 1; k < n; k++) {
          c.arr[j][k] = Complex.sub(c.arr[j][k], Complex.mult(c.arr[j][i], c.arr[i][k]));
        }
      }
    }

    const l = new CMatrix(n, n);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        if (i === j) {
          l.arr[i][j] = Complex.one;
        } else {
          l.arr[i][j] = c.arr[i][j];
        }
      }
    }

    const u = c.extractUpperTrapeze();

    return [ p, l, u ];
  }

  /**
   * Returns the result of multiplying the complex matrix by negative one.
   * @param m A complex matrix.
   */
  public static negate(m: CMatrix): CMatrix {
    return m.applyFunction(c => Complex.negate(c));
  }

  /**
   * Converts an object to a complex matrix instance.
   * @param obj - The object which represents an complex matrix.
   */
  public static fromJson(obj: Object): CMatrix {
    const matrix = new CMatrix(obj['rows'], obj['columns']);
    const arr: Object[][] = obj['arr'];

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.arr[i][j] = Complex.fromJson(arr[i][j]);
      }
    }

    return matrix;
  }

  /**
   * Gets the value of a single cell of the matrix.
   * @param row - An index of the row.
   * @param column - An index of the column.
   */
  public get(row: number, column: number): Complex {
    return this.arr[row][column];
  }

  /**
   * Sets the value of a single cell of the matrix.
   * @param row - An index of the row.
   * @param column - An index of the column.
   * @param n - A complex number (value).
   */
  public set(row: number, column: number, n: Complex): void {
    this.arr[row][column] = n;
  }

  /**
   * Returns a complex matrix whose elements are the result of
   * applying the specified function to the elements of this matrix.
   * @param func - A function that takes one complex number and returns a complex number.
   */
  public applyFunction(func: (c: Complex) => Complex): CMatrix {
    const m = new CMatrix(this.rows, this.columns);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        m.arr[i][j] = func(this.arr[i][j]);
      }
    }

    return m;
  }

  /**
   * Swaps rows at specified indices.
   * @param first - An index of first row.
   * @param second - An index of second row.
   * @throws {RangeError} - The indices out of range.
   */
  public swapRows(first: number, second: number): void {
    if (first < 0 || first >= this.rows || second < 0 || second >= this.rows) {
      throw new RangeError('Indices must be positive and less number of rows.');
    }

    if (first !== second) {
      for (let i = 0; i < this.columns; i++) {
        const temp = this.arr[first][i];
        this.arr[first][i] = this.arr[second][i];
        this.arr[second][i] = temp;
      }
    }
  }

  /**
   * Returns a clone object of the complex matrix.
   */
  public clone(): CMatrix {
    const m = new CMatrix(this.rows, this.columns);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        m.arr[i][j] = this.arr[i][j];
      }
    }

    return m;
  }

  /**
   * Returns upper trapeze matrix of the complex matrix.
   */
  public extractUpperTrapeze(): CMatrix {
    const result = new CMatrix(this.rows, this.columns);

    for (let i = 0; i < this.rows; i++) {
      for (let j = i; j < this.columns; j++) {
        result.arr[i][j] = this.arr[i][j];
      }
    }

    return result;
  }

  /**
   * Converts the complex matrix to its equivalent string representation.
   */
  public toString(): string {
    return this.toCustomFormatString((c: Complex) => c.toString());
  }

  /**
   * Converts the complex matrix of this instance to its equivalent string representation using a custom formatter.
   * @param format - A function to format real and imaginary part of the complex number.
   * @param elementSeparator - An optional string parameter to specify an element separator. (Default value ', ').
   * @param rowSeparator - An optional string parameter to specify a row separator. (Default value '; ').
   */
  public toCustomFormatString(format: (c: Complex) => string, elementSeparator: string = ', ', rowSeparator: string = '; '): string {
    let result = '[';

    for (let i = 0; i < this.rows; i++) {
      if (i > 0) {
        result += rowSeparator;
      }
      for (let j = 0; j < this.columns; j++) {
        if (j > 0) {
          result += elementSeparator;
        }
        result += format(this.arr[i][j]);
      }
    }

    result += ']';

    return result;
  }

  /**
   * Converts the complex matrix of this instance to its equivalent HTML (table element) representation using a custom formatter.
   * @param format - A function to format real and imaginary part of the complex number.
   * @param className - Html class name for the table element (default value: matrix).
   * @param maxRows - A positive number which specifies the maximum number of rows to output.
   * @param maxColumns - A positive number which specifies the maximum number of columns to output.
   */
  public toCustomFormatHtml(
    format: (c: Complex) => string,
    className: string = 'matrix',
    maxRows: number = -1,
    maxColumns: number = -1) {

    const rows = (maxRows === -1) ? this.rows : Math.min(maxRows + 1, this.rows);
    const cols = (maxColumns === -1) ? this.columns : Math.min(maxColumns + 1, this.columns);
    const trimRows = maxRows !== -1 && maxRows < this.rows;
    const trimColumns = maxColumns !== -1 && maxColumns < this.columns;

    let result = `<table class="${className}">`;

    for (let i = 0; i < rows; i++) {
      result += '<tr>';

      for (let j = 0; j < cols; j++) {
        let value: string;

        if ((trimRows && i >= rows - 1) || (trimColumns && j >= cols - 1)) {
          value = '...';
        } else {
          value = format(this.arr[i][j]);
        }

        result += `<td>${value}</td>`;
      }

      result += '</tr>';
    }

    result += '</table>';
    return result;
  }
}
