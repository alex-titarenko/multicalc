import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Trace2D } from '../plot2d-canvas/trace2d.model';
import { ExpressionEvaluatorService } from '../../shared/expression-evaluator.service';

@Component({
  selector: 'app-trace-editor',
  templateUrl: './trace-editor.component.html',
  styleUrls: [ './trace-editor.component.scss' ]
})
export class TraceEditorComponent {
  public data: Trace2D = new Trace2D();
  public readonly isEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<TraceEditorComponent>,
    @Inject(MAT_DIALOG_DATA) data: Trace2D,
    private expressionEvaluator: ExpressionEvaluatorService) {

    if (data != null)  {
      this.data = data.clone();
      this.isEdit = true;
    }
  }

  public onSubmit(f: NgForm): void {
    this.data.trace = this.expressionEvaluator.buildRealFunction(this.data.expression);
    this.dialogRef.close(this.data);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
