import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CalculatorPreferences, defaultPreferences } from '../shared/calculator-preferences.model';

@Component({
  selector: 'app-calculator-preferences',
  templateUrl: './calculator-preferences.component.html',
  styleUrls: ['./calculator-preferences.component.scss']
})
export class CalculatorPreferencesComponent {
  constructor(
    public dialogRef: MatDialogRef<CalculatorPreferencesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalculatorPreferences) { }

  reset() {
    this.data.answerFormat.decimalPlaces = defaultPreferences.answerFormat.decimalPlaces;
    this.data.answerFormat.numericFormat = defaultPreferences.answerFormat.numericFormat;
    this.data.answerFormat.complexThreshold = defaultPreferences.answerFormat.complexThreshold;
    this.data.answerFormat.zeroThreshold = defaultPreferences.answerFormat.zeroThreshold;
    this.data.angleMode = defaultPreferences.angleMode;
  }
}
