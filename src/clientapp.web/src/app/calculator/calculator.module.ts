import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgCommonModule } from 'ng-common';

import { MaterialModule } from 'shared/material.module';
import { CalculatorComponent } from './calculator.component';
import { DefineVariableComponent } from './define-variable/define-variable.component';
import { InsertFunctionComponent } from './insert-function/insert-function.component';
import { HistoryComponent } from './history/history.component';
import { CalculatorPreferencesComponent } from './calculator-preferences/calculator-preferences.component';
import { ExpressionInputComponent } from './expression-input/expression-input.component';
import { MathTokenPipe } from './shared/math-token.pipe';
import { MathResultPipe } from './shared/math-result.pipe';
import { MathKeyboardComponent } from './math-keyboard/math-keyboard.component';
import { ExtendedInputComponent } from './extended-input/extended-input.component';
import { CalculatorHelpComponent } from './calculator-help/calculator-help.component';

@NgModule({
    declarations: [
        CalculatorComponent,
        DefineVariableComponent,
        InsertFunctionComponent,
        HistoryComponent,
        CalculatorPreferencesComponent,
        ExpressionInputComponent,
        MathTokenPipe,
        MathResultPipe,
        MathKeyboardComponent,
        ExtendedInputComponent,
        CalculatorHelpComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        NgCommonModule
    ]
})
export class CalculatorModule { }
