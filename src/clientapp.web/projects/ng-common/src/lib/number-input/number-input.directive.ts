import { Directive, ElementRef, HostListener, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[talexNumberInput]',
})
export class NumberInputDirective implements OnInit, OnChanges {
  // Allow decimal numbers. The \. is only allowed once to occur
  private numberRegex: RegExp = new RegExp(/^[-+]?[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private readonly specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown'
  ];

  @Input()
  public minValue?: number = null;

  @Input()
  public maxValue?: number = null;

  @Input()
  public stepValue?: number = 1;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.type = 'number';
    this.el.nativeElement.autocomplete = 'off';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minValue']) {
      this.el.nativeElement.min = this.minValue;
    }

    if (changes['maxValue']) {
      this.el.nativeElement.max = this.maxValue;
    }

    if (changes['stepValue']) {
      this.el.nativeElement.step = this.stepValue;
    }
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Prevent input characters
    if ((event.key >= 'a' && event.key <= 'z') ||
        (event.key >= 'A' && event.key <= 'Z')) {
      event.preventDefault();
    }

    // Prevent input negative numbers if min >= 0
    if (event.key === '-') {
      if (this.minValue !== null && this.minValue >= 0) {
        event.preventDefault();
      }
      return;
    }

    // Prevent input fractional numbers if step is integer
    if (event.key === '.' && this.isStepInteger()) {
      event.preventDefault();
    }

    const current: string = this.el.nativeElement.value;
    const next = current.concat(event.key);

    if (next && !String(next).match(this.numberRegex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  private onBlur(event: FocusEvent) {
    if (this.getValue()) {
      if (this.minValue && this.getValue() < this.toNumber(this.minValue)) {
        this.updateValue(this.minValue);
      } else if (this.maxValue && this.getValue() > this.toNumber(this.maxValue)) {
        this.updateValue(this.maxValue);
      }

      if (this.isStepInteger() && !Number.isInteger(this.getValue())) {
        this.updateValue(Math.floor(this.getValue()));
      }
    } else {
      this.updateValue(this.minValue || 0);
    }
  }

  private toNumber(number: any) {
    return Number.parseFloat(number);
  }

  private isStepInteger(): boolean {
    return this.stepValue && Number.isInteger(this.toNumber(this.stepValue));
  }

  private getValue(): number {
    return this.toNumber(this.el.nativeElement.value);
  }

  private updateValue(value: number) {
    this.el.nativeElement.value = value.toString();
    this.el.nativeElement.dispatchEvent(new Event('input'));
  }
}
