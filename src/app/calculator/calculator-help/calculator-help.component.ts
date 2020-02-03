import { Component, OnInit } from '@angular/core';

interface UsageTip {
  problem: string;
  solution: string;
}

@Component({
  selector: 'app-calculator-help',
  templateUrl: './calculator-help.component.html',
  styleUrls: ['./calculator-help.component.scss']
})
export class CalculatorHelpComponent implements OnInit {
  public usageTips: UsageTip[] = [
    {
      problem: 'Input matrix expression',
      solution:
      `<ol>
        <li>Press and hold <span class="button">(</span> button to start matrix expression.</li>
        <li>Enter number (or expression) which will represent matrix element.</li>
        <li>Press and hold <span class="button">.</span> button.
          Then select <span class="button">,</span> for column separation or <span class="button">;</span> for row separation.</li>
        <li>Repeat steps 2 and 3 as necessary.</li>
        <li>Press and hold <span class="button">)</span> button to end matrix expression.</li>
      </ol>
      <i>Example: [1,2;3,4]</i>
      `
    },
    {
      problem: 'Functions with multiple arguments',
      solution:
      `In order to separate arguments of a function, press and hold <span class="button">.</span> button.
      Then select <span class="button">,</span> option.`
    },
    {
      problem: 'Functions with an expression argument',
      solution:
      `In order to insert variable identifier into function expression, press and hold <span class="button">0</span>.
      Then select <span class="button">x</span> option.<br><br>
      <i>Example: integ(sin(x), 0, pi, x)</i>
      `
    },
    {
      problem: 'Input hexadecimal, octal and binary numbers',
      solution:
      `<ol>
        <li>Every number should start from a digit; if you need to put a letter, then add a leading zero to the number.</li>
        <li>Enter digits of your number. In case of hexadecimal number press and hold the following buttons to type letters:<br>
          1 - A, 2 - B, 3 - C, 4 - D, 5 - E, 6 - F
        </li>
        <li>Press and hold <span class="button">0</span> button. Then select:<br>
          <strong>b</strong> - for binary numbers;<br>
          <strong>o</strong> - for octal numbers;<br>
          <strong>h</strong> - for hexadecimal numbers;<br>
        </li>
      </ol>
      <i>Examples: 0FAh, 427o, 101011b</i>`
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
