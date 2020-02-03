import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatTabsModule,
  MatFormFieldModule,
  MatIconModule,
  MatSliderModule,
  MatButtonModule,
  MatDialogModule
} from '@angular/material';

import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerDialogComponent } from './color-picker-dialog/color-picker-dialog.component';

@NgModule({
  declarations: [
    ColorPickerComponent,
    ColorPickerDialogComponent,
  ],
  entryComponents: [
    ColorPickerDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    ColorPickerComponent,
    ColorPickerDialogComponent
  ]
})
export class ColorPickerModule { }
