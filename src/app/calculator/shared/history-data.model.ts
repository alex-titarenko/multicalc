import { Expression } from './expression.model';
import { AnswerFormat } from './answer-format.model';
import { ComplexResult } from 'mathcore/expressions/trees/builders/complex-expression-tree-builder';
import { Complex } from 'mathcore/complex';
import { CMatrix } from 'mathcore/linear-algebra/cmatrix';


export interface HistoryItem {
  expression: Expression;
  result: ComplexResult;
  timestamp: Date;
}

export interface HistoryData {
  history: HistoryItem[];
  answerFormat: AnswerFormat;
}

export function historyFromJson(obj: Object): HistoryItem[] {
  const history: HistoryItem[] = (<Object[]>obj).map(x => ({
    expression: <Expression>x['expression'],
    result: objToComplexResult(x['result']),
    timestamp: new Date(x['timestamp'])
  }));

  return history;
}

function objToComplexResult(obj: Object): ComplexResult {
  if (obj['real'] !== undefined) {
    return Complex.fromJson(obj);
  } else if (obj['rows'] !== undefined) {
    return CMatrix.fromJson(obj);
  }

  throw new Error('Not supported object type');
}
