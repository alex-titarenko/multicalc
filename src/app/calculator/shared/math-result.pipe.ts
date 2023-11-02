import { Pipe, PipeTransform } from '@angular/core';

import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { NumericUtils } from 'mathcore/numeric-utils';
import { AnswerFormat } from './answer-format.model';

@Pipe({name: 'mathResult'})
export class MathResultPipe implements PipeTransform {
  private static formatComplex(number: Complex, answerFormat: AnswerFormat): string {
    const formattedObj = NumericUtils.complexZeroThreshold(number, answerFormat.complexThreshold, answerFormat.zeroThreshold);
    return formattedObj.toCustomFormatString(n => NumericUtils.formatNumber(n, answerFormat.decimalPlaces, answerFormat.numericFormat));
  }

  private static formatMatrix(matrix: CMatrix, answerFormat: AnswerFormat): string {
    return matrix.toCustomFormatHtml(c => MathResultPipe.formatComplex(c, answerFormat));
  }

  public transform(value: any, answerFormat: AnswerFormat): any {
    if (value instanceof Complex) {
      return MathResultPipe.formatComplex(value, answerFormat);
    } else if (value instanceof CMatrix) {
      return MathResultPipe.formatMatrix(value, answerFormat);
    } else if (value instanceof Error) {
      return '';
    }

    return value || '';
  }
}
