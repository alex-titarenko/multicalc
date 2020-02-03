export class MatrixSizeMismatchError extends Error {
  constructor(message: string = 'Matrix size does not match.') {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MatrixSizeMismatchError.prototype);
  }
}
