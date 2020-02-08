import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mathToken'})
export class MathTokenPipe implements PipeTransform {
  transform(value: any): any {
    const str = <string>value;
    return str
      .replace('*', '×')
      .replace('/', '÷')
      .replace('-', '−')
      .replace('pi', 'π')
      .replace(' ', '&nbsp;');
  }
}
