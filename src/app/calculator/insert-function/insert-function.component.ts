import { Component, OnInit, Inject, HostListener, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FunctionMetadata } from 'mathcore/expressions/trees/metadata/function-metadata';

interface FunctionGroup {
  groupName: string;
  functions: FunctionMetadata[];
}

@Component({
  selector: 'app-insert-function',
  templateUrl: './insert-function.component.html',
  styleUrls: ['./insert-function.component.scss']
})
export class InsertFunctionComponent implements OnInit {
  public functionGroups: FunctionGroup[];
  public gridColumns: number = 1;

  @Output()
  public insertFunction = new EventEmitter<string>();

  private readonly maxColumnWidth = 400;

  constructor(
    private dialogRef: MatDialogRef<InsertFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) data: FunctionMetadata[]
  ) {

    const groupsMap = data.reduce((prev, x) => {
      (prev[x.category] = prev[x.category] || []).push(x);
      return prev;
    }, {});

    this.functionGroups = [];

    for (const groupName in groupsMap) {
      if (groupsMap.hasOwnProperty(groupName)) {
        this.functionGroups.push({ groupName: groupName, functions: groupsMap[groupName] });
      }
    }
  }

  ngOnInit() {
    this.updateGridColumns();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public emitInsertFunction(funcName: string) {
    this.insertFunction.emit(`${funcName}(`);
    this.dialogRef.close();
  }

  @HostListener('window:resize')
  private onResize() {
    this.updateGridColumns();
  }

  private updateGridColumns() {
    this.gridColumns = Math.max(1, Math.floor(window.innerWidth / this.maxColumnWidth));
  }
}
