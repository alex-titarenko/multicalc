import { Component, Inject } from '@angular/core';
import { MatDialog, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

import { TraceEditorComponent } from '../trace-editor/trace-editor.component';
import { Trace2D } from '../plot2d-canvas/trace2d.model';

@Component({
  selector: 'app-trace-list',
  templateUrl: './trace-list.component.html',
  styleUrls: [ './trace-list.component.scss' ]
  })
export class TraceListComponent {
  public traces: Trace2D[];

  constructor(
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<TraceListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) data: Trace2D[]) {
    this.traces = data;
  }

  public editTrace(trace: Trace2D): void {
    this.bottomSheetRef.dismiss();

    const editDialogRef = this.dialog.open(TraceEditorComponent, {
      data: trace
    });

    editDialogRef.afterClosed().subscribe(editDialogResult => {
      if (editDialogResult != null) {
        const newTrace = <Trace2D>editDialogResult;
        const origTraceIndex = this.traces.indexOf(trace);

        if (origTraceIndex !== -1) {
          this.traces[origTraceIndex] = newTrace;
        }
      }
    });
  }

  public deleteTrace(trace: Trace2D): void {
    const index = this.traces.indexOf(trace);
    if (index !== -1) {
      this.traces.splice(index, 1);
    }

    if (this.traces.length === 0) {
      this.bottomSheetRef.dismiss();
    }
  }

  public traceVisibilityChanged(trace: Trace2D): void {
    const index = this.traces.indexOf(trace);
    if (index !== -1) {
      this.traces[index] = trace.clone();
    }
  }
}
