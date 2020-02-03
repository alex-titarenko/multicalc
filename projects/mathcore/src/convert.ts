import { FormatError } from './errors/format-error';

export class Convert {
  private static readonly decimalRegex: RegExp = /^[-+]?[0-9]+(\.[0-9]*)?([eE][-+]?[0-9]+)?$/;
  private static readonly zeroCharCode = '0'.charCodeAt(0);
  private static readonly upperACharCode = 'A'.charCodeAt(0);
  private static readonly numberDecimalSeparator = '.';

  /**
   * Returns the value of the angle in radians converted from source angle unit.
   * @param angle - The number, which represents an angle.
   * @param sourceMode - The source angle unit.
   */
  public static toRadians(angle: number, sourceMode: AngleMode) {
    switch (sourceMode) {
      case AngleMode.Degree:
        return angle / 180.0 * Math.PI;

      case AngleMode.Gradian:
        return angle * Math.PI / 200;

      case AngleMode.Radian:
        return angle;
    }
  }

  /**
   * Returns the value of the angle in destination angle unit converted from radians.
   * @param angle - The number, which represents an angle in radians.
   * @param destinationMode - The destination angle unit.
   */
  public static fromRadians(angle: number, destinationMode: AngleMode) {
    switch (destinationMode) {
      case AngleMode.Degree:
        return angle * 180 / Math.PI;

      case AngleMode.Gradian:
        return angle * 200 / Math.PI;

      case AngleMode.Radian:
        return angle;
    }
  }

  public static toNumber(s: string, fromBase?: number): number {
    if (fromBase === undefined) {
      if (s.length > 1 && Convert.isLetter(s[s.length - 1])) {
        let radix = 10;
        const ch = s[s.length - 1].toLowerCase();
        switch (ch) {
          case 'b': radix = 2; break;
          case 'd': radix = 10; break;
          case 'o': radix = 8; break;
          case 'h': radix = 16; break;

          default:
            throw new FormatError(`The number ${s} contains an invalid character '${ch}'`);
        }

        return Convert.toNumber(s.substr(0, s.length - 1), radix);
      }

      return Convert.toNumber(s, 10);
    }

    let result = 0.0;

    if (fromBase === 10) {
      return Convert.toDecimal(s);
    }

    let str = s.toUpperCase();
    if (str.length > 0 && str[0] === '.') {
      str = '0' + str;
    }

    let sign = 1;
    if (str.startsWith('+') || str.startsWith('-')) {
        sign = str[0] === '-' ? -1 : 1;
        str = str.substr(1);
    }

    let delimiterIdx = str.indexOf(Convert.numberDecimalSeparator);

    if (delimiterIdx === -1) {
      delimiterIdx = 0;
    } else {
      str = str.slice(0, delimiterIdx) + str.slice(delimiterIdx + 1, str.length);
      delimiterIdx = -(str.length - delimiterIdx);
    }

    let idx = delimiterIdx;

    for (let i = str.length - 1; i >= 0; i--) {
      let digit: number;
      if (Convert.isDigit(str[i])) {
        digit = str.charCodeAt(i) - Convert.zeroCharCode;
      } else if (Convert.isLetter(str[i])) {
        digit = 10 + (str.charCodeAt(i) - Convert.upperACharCode);
      } else {
        throw new FormatError(`The number ${s} contains an invalid character '${str[i]}'`);
      }

      if (digit >= fromBase) {
        throw new FormatError(`The number ${s} contains an invalid character '${str[i]}'`);
      }

      result += digit * Math.pow(fromBase, idx++);
    }

    return sign * result;
  }

  public static toDecimal(s: string): number {
    if (s.length > 0 && s[0] === '.') {
      s = '0' + s;
    }

    if (Convert.decimalRegex.test(s)) {
      return Number.parseFloat(s);
    }

    throw new FormatError(`${s} is not valid a decimal number.`);
  }

  private static isDigit(s: string): boolean {
    return s >= '0' && s <= '9';
  }

  private static isLetter(s: string): boolean {
    return (s >= 'a' && s <= 'z') || (s >= 'A' && s <= 'Z');
  }
}

export enum AngleMode {
  Degree = 'deg',
  Radian = 'rad',
  Gradian = 'grad'
}
