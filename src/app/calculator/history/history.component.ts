import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HistoryData, HistoryItem } from '../shared/history-data.model';
import { MessageService } from 'ng-common';
import { Expression } from '../shared/expression.model';
import { ExpressionHelper } from '../shared/expression-helper';

interface HistoryBracket {
  name: string;
  items: HistoryItem[];
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  private readonly today: Date = new Date();

  private readonly historyBracketsDef = {
    'Today': new Date(this.today.setHours(0, 0, 0, 0)),
    'Yesterday': new Date(this.today.setHours(-24, 0, 0, 0)),
    'This Week': new Date(this.today.setHours(-24 * this.today.getDay(), 0, 0, 0)),
    'This Month': new Date(this.today.setHours(-24 * this.today.getDate(), 0, 0, 0)),
    'This Year': new Date(this.today.getFullYear(), 0, 1, 0, 0, 0, 0),
  };

  public historyBrackets: HistoryBracket[];

  public insertExpression = new EventEmitter<Expression>();

  constructor(
    private messageService: MessageService,
    private dialogRef: MatDialogRef<HistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoryData) { }

  public ngOnInit() {
    this.historyBrackets = this.splitHistoryByBrackets(this.data.history);
  }

  public emitInsertExpression(expression: Expression) {
    this.insertExpression.emit(expression);
  }

  public emitInsertResult(result: any) {
    const expression = ExpressionHelper.complexResultToExpression(result, this.data.answerFormat);
    this.insertExpression.emit(expression);
  }

  public clear() {
    this.messageService.showConfirmation(
      'Do you really want to clear history?', 'CLEAR', 'CANCEL',
      () => {
        this.data.history.length = 0;
        this.dialogRef.close();
      });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private splitHistoryByBrackets(history: HistoryItem[]): HistoryBracket[] {
    const brackets: HistoryBracket[] = [];
    const historyCopy = history.slice(0).sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());

    for (const name of Object.keys(this.historyBracketsDef)) {
      const range = this.historyBracketsDef[name];
      const currentBracket = [];

      while (historyCopy.length > 0 && historyCopy[historyCopy.length - 1].timestamp > range) {
        currentBracket.push(historyCopy.pop());
      }

      if (currentBracket.length > 0) {
        brackets.push({ name: name, items: currentBracket });
      }
    }

    if (historyCopy.length > 0) {
      brackets.push({ name: 'Past', items: historyCopy });
    }

    return brackets;
  }
}
