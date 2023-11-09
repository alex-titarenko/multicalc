import { Component, ElementRef } from '@angular/core';
import { BasePageComponent } from 'shared/base-page.component';
import { Decimal as DecimalJs } from 'decimal.js-light';
import { Quantity } from 'mathcore/unit-conversion/quantities/quantity';
import { Unit } from 'mathcore/unit-conversion/units/unit';
import { UnitConverter } from 'mathcore/unit-conversion/unit-converter';
import { quantityAttribute } from 'mathcore/unit-conversion/quantities/annotation/quantity.attribute';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClipboardMenuComponent } from './clipboard-menu.component';

interface ConverterResult {
  unit: string;
  value: DecimalJs;
}

class QuantityViewModel {
  public quantity: Quantity;

  private _inputUnit: Unit;
  get inputUnit(): Unit { return this._inputUnit; }
  set inputUnit(value: Unit) { this._inputUnit = value; this.propertyChanged(); }

  private _outputUnit: Unit;
  get outputUnit(): Unit { return this._outputUnit; }
  set outputUnit(value: Unit) { this._outputUnit = value; this.propertyChanged(); }

  private propertyChanged: () => void;

  constructor(quantity: Quantity, propertyChanged: () => void) {
    this.quantity = quantity;

    this._inputUnit = quantity.units.find(x => quantityAttribute.getDefaultInputUnitSymbol(this.quantity.constructor) === x.symbol);
    this._outputUnit = quantity.units.find(x => quantityAttribute.getDefaultOutputUnitSymbol(this.quantity.constructor) === x.symbol);

    this.propertyChanged = propertyChanged;
  }

  toString(): string {
    return (this.quantity !== null) ? this.quantity.name : 'Quantity';
  }
}

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent extends BasePageComponent {
  readonly MaxInputLength: number = 29;

  private _sourceValue: string = null;
  get sourceValue(): string { return this._sourceValue != null ? this._sourceValue : '0'; }
  set sourceValue(value: string) { this._sourceValue = value; this.convert(); }

  public quantities: QuantityViewModel[] = null;
  private _targetQuantity: QuantityViewModel;
  get targetQuantity(): QuantityViewModel { return this._targetQuantity; }
  set targetQuantity(value: QuantityViewModel) { this._targetQuantity = value; this.convert(); }

  public convertedValue: DecimalJs;
  public converterValues: ConverterResult[];

  constructor(elementRef: ElementRef, private bottomSheet: MatBottomSheet) {
    super(elementRef);

    DecimalJs.precision = this.MaxInputLength;

    this.quantities = UnitConverter.quantities.map((value, index, arr) => new QuantityViewModel(value, () => { this.convert(); }));
    this.targetQuantity = this.quantities.find((value, index, arr) => value.quantity === UnitConverter.Length);
  }

  public clear() {
    this.sourceValue = null;
  }

  public input(value: string) {
    if (this.isValidNumber(value)) {
      if ((this.sourceValue === '0') && value === '0') {
        this.sourceValue = null;
      } else if (this.sourceValue === '0' && value === '.') {
        this.sourceValue = '0.';
      } else if (this.sourceValue === '0') {
        this.sourceValue = value;
      } else {
        this.sourceValue = this.sourceValue + value;
      }
    }
  }

  public backspace() {
    if (this.sourceValue == null) {
      return;
    }

    if (this.sourceValue.length === 1 ||
      (this.sourceValue.length === 2 && (this.sourceValue[0] === '0' || this.sourceValue[0] === '-')) ||
      (this.sourceValue.length === 3 && this.sourceValue.startsWith('-0'))) {
      this.sourceValue = null;
    } else {
      this.sourceValue = this.sourceValue.substr(0, this.sourceValue.length - 1);
    }
  }

  public changeSign() {
    if (this.sourceValue != null && this.sourceValue !== '0') {
      this.sourceValue = this.sourceValue.startsWith('-') ?
        this.sourceValue.substring(1) :
        ('-' + this.sourceValue);
    }
  }

  public swap() {
    const tempUnit = this.targetQuantity.inputUnit;
    const tempConvertedValue = this.convertedValue.toFixed();

    this.targetQuantity.inputUnit = this.targetQuantity.outputUnit;
    this.targetQuantity.outputUnit = tempUnit;

    this.sourceValue = tempConvertedValue;
  }

  public inputMenu() {
    this.bottomSheet.open(ClipboardMenuComponent, {
      restoreFocus: false,
      data: {
        value: this.sourceValue,
        onPaste: (value: string) => {
          this.sourceValue = value;
        }
      }
    });
  }

  public outputMenu() {
    this.bottomSheet.open(ClipboardMenuComponent, {
      restoreFocus: false,
      data: {
        value: this.convertedValue.toFixed()
      }
    });
  }

  protected onKeyPress(event: KeyboardEvent) {
    var handled = false;

    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
      this.input(event.key);
      handled = true;
    } else if (event.key === '-') {
      this.changeSign();
      handled = true;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  protected onKeyDown(event: KeyboardEvent) {
    var handled = false;

    if (event.key.toUpperCase() === 'BACKSPACE') {
      this.backspace();
      handled = true;

    } else if (event.key.toUpperCase() === 'DELETE') {
      this.clear();
      handled = true;
    }

    if (handled) {
      event.preventDefault();
    }
  }

  private convert() {
    this.convertedValue = <DecimalJs>UnitConverter.convert(
      new DecimalJs(this.sourceValue),
      this.targetQuantity.inputUnit,
      this.targetQuantity.outputUnit);

      this.converterValues = this.targetQuantity.quantity.units.map<ConverterResult>((x) => {
        return {
          unit: x.plural,
          value: <DecimalJs>UnitConverter.convert(new DecimalJs(this.sourceValue), this.targetQuantity.inputUnit, x)
        };
      });
  }

  private isValidNumber(value: string): boolean {
    const outputStr: string = (this.sourceValue ? this.sourceValue : '0') + value;

    return typeof (value !== 'undefined') &&
      outputStr.length <= this.MaxInputLength &&
      /^(\d+\.)?\d*$/.test(outputStr);
  }
}
