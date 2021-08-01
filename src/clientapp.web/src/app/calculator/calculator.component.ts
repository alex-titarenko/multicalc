import { Component, OnInit, ViewChild, ElementRef, IterableDiffers, IterableDiffer, DoCheck } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SettingsService } from 'ng-common';

import { BasePageComponent } from 'shared/base-page.component';
import { InsertFunctionComponent } from './insert-function/insert-function.component';
import { DefineVariableComponent } from './define-variable/define-variable.component';
import { HistoryComponent } from './history/history.component';
import { CalculatorPreferencesComponent } from './calculator-preferences/calculator-preferences.component';
import { CalculatorPreferences, defaultPreferences } from './shared/calculator-preferences.model';
import { ExpressionEvaluatorService } from '../shared/expression-evaluator.service';
import { NumericUtils } from 'mathcore/numeric-utils';
import { KeyboardMode } from './math-keyboard/math-keyboard.component';
import { HistoryItem, HistoryData, historyFromJson } from './shared/history-data.model';
import { Expression } from './shared/expression.model';
import { ExpressionInputComponent } from './expression-input/expression-input.component';
import { CalculatorHelpComponent } from './calculator-help/calculator-help.component';
import { removeLoader } from '../core/loader/loader.helper';

@Component({
  selector: 'app-calculator-component',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent extends BasePageComponent implements OnInit, DoCheck {
  private static readonly settingsKey: string = 'calc';
  private static readonly calculationsHistorySettingskey: string = 'calc-history';
  private static readonly compactKeyboardBreakpoint = '(max-width: 700px), (max-height: 470px)';
  private static readonly historyLimit = 50;

  public preferences: CalculatorPreferences;
  public keyboardMode: KeyboardMode = KeyboardMode.Full;
  public instantResult: any = null;
  public answer: any = null;
  public history: HistoryItem[] = [];
  private historyDiffer: IterableDiffer<HistoryItem>;
  private expression: Expression;

  @ViewChild('exprInput')
  private expressionInput: ExpressionInputComponent;

  constructor(
    elementRef: ElementRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private settingsService: SettingsService,
    private expressionEvaluator: ExpressionEvaluatorService,
    private breakpointObserver: BreakpointObserver,
    private iterableDiffers: IterableDiffers) {
    super(elementRef);
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (this.dialog.openDialogs.length === 0) {
      this.expressionInput.onKeyDown(event);
    }
  }

  public ngOnInit() {
    this.preferences = this.settingsService.get<CalculatorPreferences>(CalculatorComponent.settingsKey, defaultPreferences);

    const historyJson = this.settingsService.get<HistoryItem[]>(CalculatorComponent.calculationsHistorySettingskey, []);
    this.history = historyFromJson(historyJson);
    this.historyDiffer = this.iterableDiffers.find(this.history).create();

    this.breakpointObserver
      .observe(CalculatorComponent.compactKeyboardBreakpoint)
      .subscribe((state: BreakpointState) => {
        this.keyboardMode = state.matches ? KeyboardMode.Compact : KeyboardMode.Full;
      });
  }

  public ngAfterViewInit() {
    removeLoader();
  }

  public ngDoCheck() {
    const historyChanges = this.historyDiffer.diff(this.history);

    if (historyChanges) {
      this.settingsService.set(CalculatorComponent.calculationsHistorySettingskey, this.history);
    }
  }

  public onExpressionChange(expression: Expression) {
    this.expression = expression;
    this.answer = null;

    const plainExpression = (expression || []).map(x => x.value).join('');

    if (plainExpression && !NumericUtils.isComplexNumber(plainExpression)) {
      try {
        this.instantResult = this.expressionEvaluator.evaluate(plainExpression, {
          normalizeExpression: true,
          errorOnDivideByZero: true,
          angleMode: this.preferences.angleMode
        });
      } catch (error) {
        this.instantResult = error;
      }
    } else {
      this.instantResult = null;
    }
  }

  public evaluateExpr(): void {
    if (this.instantResult && !(this.instantResult instanceof Error)) {
      const historyItem: HistoryItem = {
        expression: this.expression,
        result: this.instantResult,
        timestamp: new Date()
      };

      this.addHistoryItem(historyItem);

      this.answer = Object.create(this.instantResult);
      this.instantResult = null;
    } else if (this.instantResult) {
      this.snackBar.open((<Error>this.instantResult).message, null, {
        duration: 2000,
        panelClass: 'snack-bar-error-message'
      });
    }
  }

  public openInsertFunctionDialog(): void {
    const diagRef = this.dialog.open(InsertFunctionComponent, {
      panelClass: 'fullscreen-dialog',
      data: this.expressionEvaluator.getFunctionsMetadata()
    });

    diagRef.componentInstance.insertFunction.subscribe(func => {
      this.expressionInput.input(func);
    });
  }

  public defineVariable(): void {
    this.dialog.open(DefineVariableComponent, {
      autoFocus: true,
      data: null
    });
  }

  public openHistory(): void {
    const data: HistoryData = {
      history: this.history,
      answerFormat: this.preferences.answerFormat
    };

    const dialogRef = this.dialog.open(HistoryComponent, {
      panelClass: 'fullscreen-dialog',
      data: data
    });

    dialogRef.componentInstance.insertExpression.subscribe((expr: Expression) => {
      this.expressionInput.inputExpression(expr);
      dialogRef.close();
    });
  }

  public openPreferences(): void {
    const dialogRef = this.dialog.open(CalculatorPreferencesComponent, {
      data: this.preferences
    });

    dialogRef.afterClosed().subscribe(() => {
      this.settingsService.set(CalculatorComponent.settingsKey, this.preferences);

      if (this.answer) {
        this.answer = Object.create(this.answer);
      } else {
        this.onExpressionChange(this.expression);
      }
    });
  }

  public openHelp(): void {
    this.dialog.open(CalculatorHelpComponent);
  }

  private addHistoryItem(historyItem: HistoryItem) {
    this.history.unshift(historyItem);

    if (this.history.length > CalculatorComponent.historyLimit) {
      this.history.pop();
    }
  }
}
