import { CalculatorComponent } from './calculator.component';
import { CalculatorHelpComponent } from './calculator-help/calculator-help.component';
import { CalculatorPreferencesComponent } from './calculator-preferences/calculator-preferences.component';
import { CommonModule } from '@angular/common';
import { DefineVariableComponent } from './define-variable/define-variable.component';
import { ExpressionInputComponent } from './expression-input/expression-input.component';
import { ExpressionMenuComponent } from './menus/expression-menu.component';
import { ExtendedInputComponent } from './extended-input/extended-input.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { InsertFunctionComponent } from './insert-function/insert-function.component';
import { InstantResultMenuComponent } from './menus/instant-result-menu.component';
import { MaterialModule } from 'shared/material.module';
import { MathKeyboardComponent } from './math-keyboard/math-keyboard.component';
import { MathResultPipe } from './shared/math-result.pipe';
import { MathTokenPipe } from './shared/math-token.pipe';
import { NgCommonModule } from 'ng-common';
import { NgModule } from '@angular/core';

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
        ExpressionMenuComponent,
        InstantResultMenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        NgCommonModule
    ]
})
export class CalculatorModule { }
