import { AngleMode } from 'mathcore/convert';
import { AnswerFormat } from './answer-format.model';

export interface CalculatorPreferences {
  answerFormat: AnswerFormat;
  angleMode: AngleMode;
}

export const defaultPreferences: CalculatorPreferences = {
  answerFormat: {
    decimalPlaces: 8,
    numericFormat: 'G',
    complexThreshold: 10,
    zeroThreshold: 14,
  },
  angleMode: AngleMode.Degree
};
