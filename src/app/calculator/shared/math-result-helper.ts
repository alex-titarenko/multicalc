import { AnswerFormat } from './answer-format.model';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Complex } from 'mathcore/complex';
import { NumericUtils } from 'mathcore/numeric-utils';

export function formatComplex(number: Complex, answerFormat: AnswerFormat, useGrouping?: boolean): string {
  const formattedObj = NumericUtils.complexZeroThreshold(number, answerFormat.complexThreshold, answerFormat.zeroThreshold);
  return formattedObj.toCustomFormatString(n => NumericUtils.formatNumber(n, answerFormat.decimalPlaces, answerFormat.numericFormat, useGrouping));
}

export function formatMathResult(value: any, answerFormat: AnswerFormat, useGrouping?: boolean): string {
  if (value instanceof Complex) {
    return formatComplex(value, answerFormat, useGrouping);
  } else if (value instanceof CMatrix) {
    return value.toCustomFormatString(c => formatComplex(c, answerFormat, useGrouping));
  } else if (value instanceof Error) {
    return '';
  }

  return value || '';
}
