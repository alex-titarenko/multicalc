import { Pipe, PipeTransform } from '@angular/core';

import { AnswerFormat } from './answer-format.model';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';
import { Complex } from 'mathcore/complex';
import { formatComplex } from './math-result-helper';

@Pipe({name: 'mathResult'})
export class MathResultPipe implements PipeTransform {
  private static formatMatrix(matrix: CMatrix, answerFormat: AnswerFormat): string {
    return matrix.toCustomFormatHtml(c => formatComplex(c, answerFormat));
  }

  public transform(value: any, answerFormat: AnswerFormat): any {
    if (value instanceof Complex) {
      return formatComplex(value, answerFormat);
    } else if (value instanceof CMatrix) {
      return MathResultPipe.formatMatrix(value, answerFormat);
    } else if (value instanceof Error) {
      return '';
    }

    return value || '';
  }
}
