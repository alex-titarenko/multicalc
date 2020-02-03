import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule, NgCommonModule } from 'ng-common';

import { MaterialModule } from 'shared/material.module';
import { Plot2DComponent } from './plot2d.component';
import { Plot2DCanvasComponent } from './plot2d-canvas/plot2d-canvas.component';
import { Plot2DPreferencesComponent } from './plot2d-preferences/plot2d-preferences.component';
import { TraceEditorComponent } from './trace-editor/trace-editor.component';
import { MathExpressionValidator } from './shared/math-expression.validator';
import { TraceListComponent } from './trace-list/trace-list.component';

@NgModule({
  declarations: [
    Plot2DComponent,
    Plot2DCanvasComponent,
    Plot2DPreferencesComponent,
    TraceEditorComponent,
    MathExpressionValidator,
    TraceListComponent,
  ],
  entryComponents: [
    Plot2DPreferencesComponent,
    TraceEditorComponent,
    TraceListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ColorPickerModule,
    NgCommonModule
  ]
})
export class Plot2DModule { }
