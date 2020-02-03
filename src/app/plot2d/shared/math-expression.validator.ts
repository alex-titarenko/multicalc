import { Directive } from '@angular/core';
import { Validator, ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ExpressionEvaluatorService } from '../../shared/expression-evaluator.service';

@Directive({
  selector: '[appMathExpression][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MathExpressionValidator, multi: true }
  ]
})
export class MathExpressionValidator implements Validator {
  constructor(private expressionEvaluator: ExpressionEvaluatorService) {}

  public validate (control: AbstractControl): ValidationErrors | null {
    const expression = <string>control.value;

    if (expression == null || expression === '') {
      return { 'mathExpression': 'Expression is empty' };
    }

    try {
      const fn = this.expressionEvaluator.buildRealFunction(expression);
      const result = fn(0);

      if (typeof result !== 'number') {
        throw new Error('Result is not a number');
      }
    } catch {
      return { 'mathExpression': 'Invalid expression' };
    }

    return null;
  }
}
